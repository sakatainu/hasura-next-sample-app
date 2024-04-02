import EChartsReact from 'echarts-for-react';
import { RefObject, useCallback, useMemo, useRef } from 'react';
import {
  SeriesOption,
  StockGraphProps,
  YAXisComponentOption,
  YAXisOption,
} from '~/components/ui/StockGraph';
import {
  averageSeries,
  calcValue2,
  formatValue2,
  mapEChartSeriesOption as toEChartSeriesOption,
} from '~/hooks/useStockGraph/utils';
import { averageSeriesTemplate, defaultSeriesTemplate } from './config';
import { AggregateType, CoordPoint, GraphSeriesOption } from './types';

export type StockGraphHookParam = {
  xAxisValues: string[];
  seriesSources?: GraphSeriesOption[];
  seriesTemplate?: GraphSeriesOption;
  seriesTemplateOverrides?: GraphSeriesOption[];
  addAggregateSeries?: AggregateType[];
};

export type StockGraphHook = (param: StockGraphHookParam) => Pick<
  StockGraphProps,
  'series' | 'yAxis'
> & {
  ref: RefObject<EChartsReact>;
  mappedSeriesOptions: GraphSeriesOption[];
};

/*
 * TODO:
 * - ズームに応じた変動率計算の起点の対応
 * - normalizedHistoricalEntries でやっていたX軸の正規化（複数の系列のx座標をそろえる）
 * - マーカーの表示
 */
const useStockGraph: StockGraphHook = ({
  xAxisValues,
  seriesSources = [],
  seriesTemplate = defaultSeriesTemplate,
  seriesTemplateOverrides = [],
  addAggregateSeries = [],
}) => {
  const getSeriesOption = useCallback(
    (sourceOption: GraphSeriesOption): GraphSeriesOption => {
      const overrides = seriesTemplateOverrides.find(
        (v) => v.templateName === sourceOption.templateName
      );

      return {
        ...seriesTemplate,
        ...overrides,
        ...sourceOption,
      };
    },
    [seriesTemplate, seriesTemplateOverrides]
  );

  const seriesOptions = useMemo(
    () => seriesSources.map(getSeriesOption),
    [seriesSources, getSeriesOption]
  );

  const ref = useRef<EChartsReact | null>(null);

  const calcCoordPoints = useCallback(
    (seriesOption: GraphSeriesOption): CoordPoint[] => {
      const dataSource = seriesOption.dataSource || [];
      const converted = seriesOption.dataConverter
        ? seriesOption.dataConverter(dataSource)
        : dataSource;

      const xValues = converted.map(({ x }) => x);
      const yValues = calcValue2(
        converted,
        seriesOption.calcMode || 'standard',
        seriesOption.calcOrigin || 0,
        // TODO: ズームレンジ
        ['0', '0']
      );

      return xValues.map((x, i) => ({
        x,
        y: yValues[i],
      }));
    },
    []
  );

  const convertedSeriesOptions = useMemo(
    () =>
      seriesOptions.map<GraphSeriesOption>((option) => ({
        ...option,
        dataSource: calcCoordPoints(option),
      })),
    [seriesOptions, calcCoordPoints]
  );

  const aggregateSeriesOptions = useMemo(
    () =>
      addAggregateSeries.flatMap<GraphSeriesOption>((type) => {
        switch (type) {
          case 'average': {
            const sources = convertedSeriesOptions.map(
              ({ dataSource }) => dataSource || []
            );
            const averageSeriesSource = averageSeries(sources, xAxisValues);
            const primaryOption = seriesOptions.find(
              (v) => v.yAxisId === 'right'
            );

            const unit = (() => {
              if (primaryOption?.calcMode === 'performance') return '%';
              return primaryOption?.unit ? `${primaryOption.unit}` : '';
            })();

            return [
              {
                id: 'average',
                templateName: 'average',
                dataSource: averageSeriesSource,
                unit,
                ...averageSeriesTemplate,
              },
            ];
          }
          default: {
            return [];
          }
        }
      }),
    [addAggregateSeries, convertedSeriesOptions, seriesOptions, xAxisValues]
  );

  const mappedSeriesOptions = useMemo(
    () => [...convertedSeriesOptions, ...aggregateSeriesOptions],
    [convertedSeriesOptions, aggregateSeriesOptions]
  );

  const series = useMemo(
    () => mappedSeriesOptions.map<SeriesOption>(toEChartSeriesOption),
    [mappedSeriesOptions]
  );

  const getYAxisOption = useCallback(
    (
      option: GraphSeriesOption | undefined
    ): YAXisComponentOption | undefined => {
      if (!option) return undefined;

      const unit = (() => {
        if (option.calcMode === 'performance') return '(%)';
        return option.unit ? `(${option.unit})` : '';
      })();
      const yAxisName = [option.yAxisLabel, unit].join(' ');

      return {
        name: yAxisName || undefined,
        fixedOrigin: option.yAxisFixedOrigin,
        axisLabel: {
          formatter: (v: number) => formatValue2(v, option, 'label'),
        },
        axisPointer: {
          label: {
            formatter: ({ value }) => formatValue2(value, option, 'label'),
          },
        },
      };
    },
    []
  );

  const yAxis = useMemo<YAXisOption>(
    () => ({
      right: getYAxisOption(seriesOptions.find((v) => v.yAxisId === 'right')),
      left: getYAxisOption(seriesOptions.find((v) => v.yAxisId === 'left')),
    }),
    [getYAxisOption, seriesOptions]
  );

  return useMemo(
    () => ({
      ref,
      series,
      yAxis,
      mappedSeriesOptions,
    }),
    [mappedSeriesOptions, series, yAxis]
  );
};

export default useStockGraph;
