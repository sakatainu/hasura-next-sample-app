import dayjs from 'dayjs';
import {
  getNewsMarkerPinConfig,
  mixedMarkerStyle,
} from '~/components/ui/StockGraphEditor';
import { NewsItem } from '~/hooks/model/useNewsItems';
import { StockHistoricalRecordData } from '~/hooks/model/useStockHistorical';
import { ISO_DATE_FORMAT } from '~/types/date';
import {
  calcPerformance,
  entries,
  format,
  fromEntries,
  groupBy,
  transpose,
} from '~/utils';
import { SeriesOption } from '~/components/ui/StockGraph';
import Decimal from 'decimal.js';
import {
  CoordPoint,
  Dataset,
  GraphSeriesOption,
  StockGraphSeriesConfig,
  StockGraphSeriesConfigContext,
} from './types';

/** @deprecated GraphSeriesOption に移行のため、代わりに calcValue2 を使用 */
export const calcValue = (
  records: StockHistoricalRecordData[],
  zoomPeriod: Period,
  context: StockGraphSeriesConfigContext,
  config: StockGraphSeriesConfig
): number[] => {
  if (config.calcMode === 'performance') {
    const values = records.map(({ value }) => value);

    const dateList = records.map((v) => v.dateString);
    const startDate = dayjs(zoomPeriod.start).format(ISO_DATE_FORMAT);
    const startIndex = dateList.indexOf(startDate);

    const par = calcPerformance(values, startIndex);
    const fixedPar = par.map((v) => Number(v.toFixed(1)));
    return fixedPar;
  }
  return records.map(({ value }) => value);
};

export const calcValue2 = (
  dataSource: CoordPoint[],
  calcMode: 'standard' | 'performance',
  calcOrigin: number | 'zoomStart',
  zoomRange: [string, string]
): number[] => {
  const values = dataSource.map((v) => v.y);

  if (calcMode === 'performance') {
    let startIndex: number;
    if (calcOrigin === 'zoomStart') {
      startIndex = dataSource.findIndex((v) => v.x === zoomRange[0]);
    } else {
      startIndex = calcOrigin || 0;
    }

    const par = calcPerformance(values, startIndex);
    const fixedPar = par.map((v) => Number(v.toFixed(1)));
    return fixedPar;
  }

  return values;
};

/** @deprecated GraphSeriesOption に移行のため、代わりに formatValue2 使用 */
export const formatValue = (
  value: unknown,
  config: StockGraphSeriesConfig,
  type: 'label' | 'tooltip'
): string => {
  if (value === undefined || value === null) return '-';
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '-';
  if (Number.isNaN(value)) return '-';

  if (config.calcMode === 'performance') {
    return `${format(value, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
    })}%`;
  }

  if (type === 'label') return config.valueFormat(value);
  return (config.tooltip?.valueFormat || config.valueFormat)(value);
};

export const formatValue2 = (
  value: unknown,
  seriesOption: GraphSeriesOption,
  type: 'label' | 'tooltip'
): string => {
  if (value === undefined || value === null) return '-';
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '-';
  if (Number.isNaN(value)) return '-';

  if (seriesOption.calcMode === 'performance') {
    return `${format(value, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
    })}%`;
  }

  const defaultFormatter =
    seriesOption.valueFormat || ((v: number) => v.toLocaleString());
  const tooltipFormatter =
    seriesOption['tooltip.valueFormat'] || defaultFormatter;

  const formatter = type !== 'label' ? tooltipFormatter : defaultFormatter;
  const $value = formatter(value);
  return seriesOption.unit ? `${$value}${seriesOption.unit}` : $value;
};

export const getMarkerStyle = (newsGroup: NewsItem[]) => {
  const isSameNewsType = newsGroup.every(
    (v) =>
      v.category.code === newsGroup[0].category.code &&
      v.type.code === newsGroup[0].type.code
  );
  const markerValue =
    newsGroup.length > 9
      ? {
          value: '9+',
          label: {
            fontSize: 11,
          },
        }
      : {
          value: newsGroup.length.toString(),
        };

  if (isSameNewsType) {
    const config = getNewsMarkerPinConfig(newsGroup[0]);
    if (!config) return undefined;

    return {
      itemStyle: {
        color: config.markerColor,
      },
      ...markerValue,
    };
  }

  return {
    itemStyle: {
      ...mixedMarkerStyle,
    },
    ...markerValue,
  };
};

export const getNewsMarker = (
  seriesId: string,
  dataset: Dataset[],
  newsItems: NewsItem[],
  emphasisTargetId?: string | null
) => {
  const [stockIssueCode, type] = seriesId.split('-');

  const historicalType = type === 'stockPrice' ? 'close' : type;

  const datasetIndex = Object.fromEntries(dataset.map((v) => [v.id, v]));
  const targetDataset = datasetIndex[stockIssueCode];

  if (!targetDataset) return [];

  const dataRowIndex = targetDataset.source.at(0)?.indexOf(historicalType);

  if (!dataRowIndex || dataRowIndex < 0) return [];

  const table = transpose(targetDataset.source);

  const newsMarkers = newsItems.filter(
    (newsItem) => newsItem.about.stockIssue.code === stockIssueCode
  );

  const newsWithGroupByDate = groupBy(newsMarkers, (newsItem) =>
    dayjs(newsItem.timestamp).format(ISO_DATE_FORMAT)
  );
  const dateHeaderIndex = 0;

  const markers = entries(newsWithGroupByDate).flatMap(([date, newsGroup]) => {
    if (!newsGroup?.length) return [];

    const xPoint = date;
    const colIndex = table.at(dateHeaderIndex)?.indexOf(xPoint);
    if (!colIndex || colIndex < 0) return [];

    const yPoint = colIndex && table.at(dataRowIndex)?.at(colIndex);
    if (yPoint === undefined) return [];

    const markerStyle = getMarkerStyle(newsGroup);
    if (!markerStyle) return [];

    const isEmphasis = newsGroup.some((v) => v.id === emphasisTargetId);

    return [
      {
        ...markerStyle,
        id: newsGroup[0].id,
        name: newsGroup[0].id,
        coord: [xPoint, yPoint],
        payload: {
          value: newsGroup,
        },
        symbolSize: isEmphasis ? 60 : undefined,
      },
    ];
  });

  return markers;
};

export const sumIndicatorValues = (
  factData: {
    dates: string[];
    values: number[];
  }[],
  combinedXAxisValues: string[]
): {
  dates: string[];
  values: number[];
} | null => {
  const totalForIndicators = factData.reduce<{
    dates: string[];
    values: number[];
  } | null>((previous, { values, dates }) => {
    const indicatorValueMap = fromEntries(
      values.map<[string, number]>((v, dateIndex) => [dates[dateIndex], v])
    );

    if (!previous) {
      return {
        dates: combinedXAxisValues,
        values: combinedXAxisValues.map((dateValue) => {
          const value = indicatorValueMap[dateValue];
          return Number.isFinite(value) ? value : 0;
        }),
      };
    }

    return {
      ...previous,
      values: previous.values.map((v, dateIndex) => {
        const value = indicatorValueMap[previous.dates[dateIndex]];
        const fixed = Number.isFinite(value) ? value : 0;
        return v + fixed;
      }),
    };
  }, null);

  return totalForIndicators;
};

type AggregateSeriesCoordPoint = CoordPoint & { count: number };

export const createAverageSource = (
  targetIndicator: {
    values: number[];
    dates: string[];
  }[],
  combinedXAxisValues: string[]
) => {
  const stockIssueCount = targetIndicator.length;
  if (!stockIssueCount) return [];

  const totalForIndicators = sumIndicatorValues(
    targetIndicator,
    combinedXAxisValues
  );

  if (!totalForIndicators) return [];

  const { dates, values } = totalForIndicators;

  const averageValues = values.map((total) => total / stockIssueCount);

  const table = [
    ['date', ...dates],
    ['average', ...averageValues],
  ];
  return transpose<string | number>(table);
};

export const getDataset = (
  dataSource: CoordPoint[] | undefined
): (string | number)[][] => {
  if (!dataSource) return [];
  const dataTable = dataSource.reduce<(string | number)[][]>(
    ([x, y], { x: xValue, y: yValue }) => {
      x.push(xValue);
      y.push(yValue);
      return [x, y];
    },
    [[], []]
  );

  return transpose(dataTable);
};

export const mapEChartSeriesOption = (
  option: GraphSeriesOption
): SeriesOption => ({
  id: option.id,
  type: option.graphType,
  name: option.name,
  itemStyle: option.itemStyle,
  color: option.color,
  connectNulls: option.connectNulls,
  yAxisId: option.yAxisId,
  data: getDataset(option.dataSource),
  showSymbol: false,
  tooltip: {
    valueFormatter: (optData) => {
      const dataList = Array.isArray(optData) ? optData : [optData];
      const values = dataList.map((value) =>
        formatValue2(value, option, 'tooltip')
      );
      return values.join();
    },
  },
  lineStyle: option.lineStyle,
  smooth: option.smooth,
});

export const sumSeries = (
  seriesSources: CoordPoint[][],
  xAxisValues: string[]
): AggregateSeriesCoordPoint[] => {
  const initialValues = xAxisValues.map((date) => ({
    x: date,
    y: Number.NaN,
    count: 0,
  }));

  const ret = seriesSources.reduce<AggregateSeriesCoordPoint[]>(
    (acc, current) => {
      const map = fromEntries(current.map((v) => [v.x, v]));

      return acc.map((v) => {
        const target = map[v.x];
        if (!Number.isFinite(target?.y)) return v;

        const prev = Number.isNaN(v.y) ? 0 : v.y;

        return {
          x: v.x,
          y: new Decimal(prev).plus(target.y).toNumber(),
          count: v.count + 1,
        };
      });
    },
    initialValues
  );

  return ret;
};

export const averageSeries = (
  seriesSources: CoordPoint[][],
  xAxisValues: string[]
): AggregateSeriesCoordPoint[] => {
  const sumSeriesSource = sumSeries(seriesSources, xAxisValues);

  return sumSeriesSource.map((v) => {
    if (!v.count) return v;

    return {
      x: v.x,
      y: new Decimal(v.y).div(v.count).toNumber(),
      count: v.count,
    };
  });
};
