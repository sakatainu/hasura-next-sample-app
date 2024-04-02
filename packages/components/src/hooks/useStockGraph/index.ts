import dayjs from 'dayjs';
import { MarkLineComponentOption, MarkPointComponentOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { GraphEditorTopToolbarValue } from '~/components/ui/GraphEditorTopToolbar';
import { isAggregateType } from '~/components/ui/GraphEditorTopToolbar/AggregateMenu';
import {
  SeriesOption,
  StockGraphProps,
  XAXisOption,
  YAXisOption,
  ZoomHandler,
} from '~/components/ui/StockGraph';
import { IndicatorGoalValue } from '~/hooks/model/useGroupIndicatorGoal';
import { NewsItem } from '~/hooks/model/useNewsItems';
import useShallowCompareMemo from '~/hooks/useShallowCompareMemo';
import configTemplate from '~/hooks/useStockGraph/config';
import { ISO_DATE_FORMAT } from '~/types/date';
import {
  StockHistoricalEntry,
  StockHistoricalRecordData,
  stockHistoricalTypeLabel,
} from '~/types/stock';
import { distinct, toDateString, transpose } from '~/utils';
import { useRecoilValue } from 'recoil';
import { newsListViewRecoilState } from '~/components/model/views/NewsListView';
import {
  calcValue,
  createAverageSource,
  formatValue,
  getNewsMarker,
} from '~/hooks/useStockGraph/utils';
import { dateString } from '~/types/graphql';
import {
  Dataset,
  IndicatorType,
  StockGraphSeriesConfig,
  StockGraphSeriesConfigContext,
  StockGraphSeriesOverridableConfig,
  StockHistoricalName,
  StockHistoricalRecordValue,
} from './types';

export * from './types';
export { default as useStockGraph2 } from './useStockGraph';

export type StockGraphHookParam = {
  historicalEntries: StockHistoricalEntry[];
  newsItems: NewsItem[];
  configOverride?: StockGraphSeriesOverridableConfig;
  selectedIndicatorTypes?: (IndicatorType | 'stockPrice')[];
  indicatorGoals?: IndicatorGoalValue[];
} & Pick<
  GraphEditorTopToolbarValue,
  'selectedTechnicals' | 'showIndicatorGoal' | 'selectedAggregateTypes'
>;

type StockGraphSeriesConfigForYAxis = StockGraphSeriesConfig & {
  label: string;
};

const defaultEndDate = dayjs().toDate();
const defaultStartDate = defaultEndDate;

const initialXAxisDates = [defaultStartDate, defaultEndDate] as const;

const CALC_DELAY_MS = 500;

export type StockGraphHook = (param: StockGraphHookParam) => StockGraphProps & {
  ref: RefObject<EChartsReact>;
  markPointDataset: MarkPointComponentOption[];
};

/** @deprecated 代わりに src/hooks/useStockGraph/useStockGraph.ts#useStockGraph を使用する */
const useStockGraph: StockGraphHook = ({
  historicalEntries,
  newsItems,
  configOverride,
  selectedIndicatorTypes = [],
  selectedTechnicals = [],
  selectedAggregateTypes = [],
  indicatorGoals = [],
  showIndicatorGoal,
}) => {
  const memoedSelectedIndicatorTypes = useShallowCompareMemo(
    () => selectedIndicatorTypes,
    [selectedIndicatorTypes]
  );
  const memoedSelectedTechnicalTypes = useShallowCompareMemo(
    () => selectedTechnicals,
    [selectedTechnicals]
  );
  const memoedIndicatorGoals = useShallowCompareMemo(
    () => indicatorGoals,
    [indicatorGoals]
  );

  // TODO: ドメインに依存しないようにリファクタリングする
  const newsListState = useRecoilValue(newsListViewRecoilState);

  const getConfig = useCallback(
    (configId: string): StockGraphSeriesConfig => {
      const baseConfig = configTemplate.default;
      const baseHistoricalConfigs = Object.fromEntries(
        configTemplate.historicalTemplates?.map((v) => [v.type, v]) || []
      );

      const overrideConfig = configOverride?.default;
      const overrideHistoricalConfigs = Object.fromEntries(
        configOverride?.historicalTemplates?.map((v) => [v.type, v]) || []
      );

      return {
        ...baseConfig,
        ...baseHistoricalConfigs[configId],
        ...overrideConfig,
        ...overrideHistoricalConfigs[configId],
      };
    },
    [configOverride?.default, configOverride?.historicalTemplates]
  );

  const xAxisDateValues = useMemo(() => {
    const mergeDateValues = historicalEntries
      .flatMap((entry) => entry.items)
      .flatMap((v) => v.data)
      .map((v) => v.dateString);
    const distinctDateValues = distinct(mergeDateValues);

    return distinctDateValues
      .sort()
      .map((v) => dateString(dayjs(v).format(ISO_DATE_FORMAT)));
  }, [historicalEntries]);

  const normalizedHistoricalEntries = useMemo(() => {
    const normalized = historicalEntries.map<StockHistoricalEntry>(
      ({ items, ...rest }) => {
        const newItems = items.map(({ type, data }) => {
          const entries = data.map<[DateString, StockHistoricalRecordData]>(
            (v) => [v.dateString, v]
          );
          const dataDict = Object.fromEntries(entries);

          const newData = xAxisDateValues.map<StockHistoricalRecordData>(
            (dateValue) => {
              const historicalRecord = dataDict[dateValue];

              if (historicalRecord) return historicalRecord;

              return {
                dateString: dateValue,
                date: dayjs(dateValue).toDate(),
                value: Number.NaN,
              };
            }
          );

          return { type, data: newData };
        });

        return { ...rest, items: newItems };
      }
    );

    return normalized;
  }, [historicalEntries, xAxisDateValues]);

  const ref = useRef<EChartsReact | null>(null);

  const [zoomPeriod, setZoomPeriod] = useState<Period>(() => ({
    start: initialXAxisDates[0],
    end: initialXAxisDates[1],
  }));

  const [debouncedZoomPeriod, setDebouncedZoomPeriod] = useState(zoomPeriod);
  useDebounce(
    () => {
      setDebouncedZoomPeriod(zoomPeriod);
    },
    CALC_DELAY_MS,
    [zoomPeriod]
  );

  const selectedHistoricalNames = useShallowCompareMemo<StockHistoricalName[]>(
    () => [...memoedSelectedIndicatorTypes, ...memoedSelectedTechnicalTypes],
    [memoedSelectedIndicatorTypes, memoedSelectedTechnicalTypes]
  );

  const dataset = useShallowCompareMemo(() => {
    const factData = normalizedHistoricalEntries.flatMap(
      ({ stockIssueName, stockIssueCode, items: historicalItems }) => {
        if (!historicalItems.length) return [];

        const bodyRows = historicalItems.map(
          ({ type: historicalName, data: values }) => {
            // TODO: パフォーマンス改善
            // 指標と表示方法に紐づくデータのみを計算する（例：株価 & ローソク足 => close, open, high, low）
            // if (!selectedHistoricalNames.includes(historicalName)) return [];

            const stockIssue = { stockIssueName, stockIssueCode };
            const context = { historicalName, stockIssue };
            const config = getConfig(historicalName);

            const historicalValues = calcValue(
              values,
              debouncedZoomPeriod,
              context,
              config
            );

            return {
              type: historicalName,
              values: historicalValues,
            };
          }
        );

        const dateValues = historicalItems[0].data.map((v) => v.dateString);

        return [
          {
            stockIssueCode,
            dates: dateValues,
            values: bodyRows,
          },
        ];
      }
    );

    const factDataset = factData.map<Dataset>(
      ({ stockIssueCode, dates, values }) => {
        const table = [
          ['date', ...dates],
          ...values.map((v) => [v.type, ...v.values]),
        ];

        const transposed = transpose<string | number>(table);
        return { id: stockIssueCode, source: transposed };
      }
    );

    if (!selectedAggregateTypes.length) return factDataset;
    const selectedHistoricalType = selectedHistoricalNames.at(0);
    if (!selectedHistoricalType) return factDataset;

    const targetIndicator = factData.flatMap((v) => {
      const targetIndicatorValues = v.values.find(
        (indicator) => selectedHistoricalType === indicator.type
      );

      if (!targetIndicatorValues) return [];
      return [
        {
          ...v,
          values: targetIndicatorValues.values,
        },
      ];
    });

    const aggregateDataset = selectedAggregateTypes.flatMap<Dataset>((type) => {
      switch (type) {
        case 'average': {
          const averageSource = createAverageSource(
            targetIndicator,
            xAxisDateValues
          );
          return [{ id: type, source: averageSource }];
        }
        default:
          return [];
      }
    });

    return [...factDataset, ...aggregateDataset];
  }, [
    normalizedHistoricalEntries,
    getConfig,
    debouncedZoomPeriod,
    selectedIndicatorTypes,
    xAxisDateValues,
    selectedAggregateTypes,
    selectedHistoricalNames,
  ]);

  const getMarkLine = useCallback(
    ({
      historicalName,
      config,
    }: {
      historicalName: string;
      config: StockGraphSeriesConfig;
    }):
      | {
          markLine: MarkLineComponentOption;
        }
      | undefined => {
      if (!showIndicatorGoal) {
        return {
          markLine: {
            data: [],
          },
        };
      }

      const indicatorGoal = memoedIndicatorGoals.find((v) => {
        if (['close', 'stockPrice'].includes(v.type)) {
          return ['close', 'stockPrice'].includes(historicalName);
        }
        return v.type === historicalName;
      });

      if (!indicatorGoal) return undefined;
      if (typeof indicatorGoal.value !== 'number') return undefined;

      const position = config.yAxisId === 'right' ? 'end' : 'start';

      return {
        markLine: {
          data: [
            {
              yAxis: indicatorGoal.value,
              label: {
                position,
                formatter: ({ value }) => formatValue(value, config, 'label'),
              },
            },
          ],
          symbol: ['none', 'none'],
          lineStyle: {
            width: 2,
          },
        },
      };
    },
    [memoedIndicatorGoals, showIndicatorGoal]
  );

  type YAxisConfig = StockGraphSeriesConfigForYAxis & {
    id: StockHistoricalName;
  };

  const [yAxisConfigForRight, yAxisConfigForLeft] = useMemo(
    () =>
      selectedHistoricalNames.reduce<[YAxisConfig | null, YAxisConfig | null]>(
        (acc, historicalName) => {
          if (acc[0] && acc[1]) return acc;

          const config = getConfig(historicalName);
          const label =
            historicalName === 'stockPrice'
              ? '株価'
              : stockHistoricalTypeLabel[historicalName];

          const currentConfig = { ...config, label, id: historicalName };
          if (!acc[0] && config.yAxisId === 'right') acc[0] = currentConfig;
          if (!acc[1] && config.yAxisId === 'left') acc[1] = currentConfig;

          return acc;
        },
        [null, null]
      ),
    [getConfig, selectedHistoricalNames]
  );

  const getSeriesOne = useCallback(
    (
      historicalName: string,
      context: StockGraphSeriesConfigContext,
      config: StockGraphSeriesConfig,
      data: StockHistoricalRecordValue[]
    ): SeriesOption => {
      const seriesId = (() => {
        if (isAggregateType(historicalName)) {
          return historicalName;
        }
        if (!context.stockIssue?.stockIssueCode)
          throw new Error('stockIssueCode is undefined');
        return `${context.stockIssue.stockIssueCode}-${historicalName}`;
      })();

      const datasetId = (() => {
        if (isAggregateType(historicalName)) {
          return historicalName;
        }
        if (!context.stockIssue?.stockIssueCode)
          throw new Error('stockIssueCode is undefined');
        return context.stockIssue.stockIssueCode;
      })();

      const tooltipConfig = (() => {
        // TODO: 苦肉の策 特定の指標依存処理をやめる
        if (historicalName !== 'average') return getConfig(historicalName);
        return getConfig(yAxisConfigForRight?.id || historicalName);
      })();

      return {
        id: seriesId,
        type: config.graphType,
        name: config.name(context),
        itemStyle: config.itemStyle,
        color: config.color,
        connectNulls: config.connectNulls,
        yAxisId: config.yAxisId,
        ...(config.dataConverter
          ? { data: config.dataConverter(data) }
          : {
              datasetId,
              encode: config.encode(context),
            }),
        showSymbol: false,
        tooltip: {
          valueFormatter: (optData) => {
            const dataList = Array.isArray(optData) ? optData : [optData];
            const values = dataList.map((value) =>
              formatValue(value, tooltipConfig, 'tooltip')
            );
            return values.join();
          },
        },
        lineStyle: config.lineStyle,
        smooth: config.smooth,
        ...getMarkLine({ historicalName, config }),
      };
    },
    [getConfig, getMarkLine, yAxisConfigForRight?.id]
  );

  const getMarkPoint = useCallback(
    (id: string): MarkPointComponentOption => ({
      symbol: 'pin',
      symbolSize: 28,
      data: getNewsMarker(id, dataset, newsItems, newsListState.focusedItem),
      label: {
        color: '#fff',
        fontWeight: 'bolder',
      },
      itemStyle: {
        // borderColor: getAvatarColor(stockIssue.name),
        // borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 3,
      },
    }),
    [dataset, newsItems, newsListState.focusedItem]
  );

  const { series, markPointDataset } = useShallowCompareMemo(() => {
    if (!selectedHistoricalNames.length) {
      return {
        series: [],
        markPointDataset: [],
      };
    }

    const seriesGroupByHistorical = selectedHistoricalNames.map(
      (historicalName, historicalIndex) => {
        const config = getConfig(historicalName);

        const stockSeries = historicalEntries.map<SeriesOption>(
          (stockEntry) => {
            const historicals = stockEntry.items;
            const historical = historicals.find(
              (v) => v.type === historicalName
            );

            const context = { historicalName, stockIssue: stockEntry };
            const oneSeries = getSeriesOne(
              historicalName,
              context,
              config,
              historical?.data || []
            );

            if (historicalIndex === 0) {
              oneSeries.markPoint = getMarkPoint(oneSeries.id as string);
            }

            return oneSeries;
          }
        );

        return stockSeries;
      }
    );

    const factSeries = seriesGroupByHistorical.flat();

    const aggregateSeries = selectedAggregateTypes.map((type) => {
      const config = getConfig(type);
      const context = { historicalName: type, stockIssue: null };

      return getSeriesOne(type, context, config, []);
    });

    const markPoints = seriesGroupByHistorical[0].flatMap((v) =>
      v.markPoint ? [v.markPoint] : []
    );

    return {
      series: [...factSeries, ...aggregateSeries],
      markPointDataset: markPoints,
    };
  }, [
    getConfig,
    getMarkPoint,
    getSeriesOne,
    historicalEntries,
    selectedHistoricalNames,
  ]);

  const xAxis = useShallowCompareMemo<XAXisOption>(
    () => ({
      data: xAxisDateValues,
      axisLabel: {
        formatter: (v: string | Date) => toDateString(v),
      },
    }),
    [normalizedHistoricalEntries]
  );

  const yAxis = useShallowCompareMemo<YAXisOption>(() => {
    const getUnit = (config: StockGraphSeriesConfigForYAxis | null) => {
      if (!config) return undefined;

      if (config.calcMode === 'performance') return '%';

      if (config.label === '株価') return '円';
      return config.unit;
    };

    const formatConfig = (
      config: StockGraphSeriesConfigForYAxis | null
    ): YAXisOption['right'] => {
      if (!config) return undefined;

      const unit = getUnit(config);

      return {
        name: [config.label, unit ? `(${unit})` : ''].filter(Boolean).join(' '),
        fixedOrigin: config.yAxisFixedOrigin,
        axisLabel: {
          formatter: (v: number) => formatValue(v, config, 'label'),
        },
        axisPointer: {
          label: {
            formatter: ({ value }) => formatValue(value, config, 'label'),
          },
        },
      };
    };

    return {
      right: formatConfig(yAxisConfigForRight),
      left: formatConfig(yAxisConfigForLeft),
    };
  }, [getConfig, selectedHistoricalNames]);

  const handleZoom = useCallback<ZoomHandler>(({ start, end }) => {
    setZoomPeriod({ start, end });
  }, []);

  return useShallowCompareMemo(
    () => ({
      ref,
      dataset,
      series,
      xAxis,
      yAxis,
      markPointDataset,
      onZoom: handleZoom,
    }),
    [dataset, series, xAxis, yAxis, markPointDataset, handleZoom]
  );
};

export default useStockGraph;
