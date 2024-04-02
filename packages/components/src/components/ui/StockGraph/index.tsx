import { Box, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { ECharts, EChartsOption, Payload } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import useEffectRef from '~/hooks/useEffectRef';
import { isFiniteNumber } from '~/utils';
import { StockGraphProps, getScaleYAxisOption } from './types';

export * from './types';

const mergeOption = {
  replaceMerge: ['xAxis', 'yAxis', 'series', 'dataset'],
};

const StockGraph = React.forwardRef<EChartsReact, StockGraphProps>(
  (
    {
      canvasStyle,
      dataset,
      xAxis = {},
      yAxis = {},
      series = [],
      dataZoom,
      state,
      onZoom,
      onReady,
      onMouseOver,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const paramRef = useEffectRef({
      onZoom,
      onReady,
      onMouseOver,
    });

    const gridOffset = (() => {
      if (!dataZoom || dataZoom.show) return null;
      return {
        top: 48,
        bottom: 24,
        left: 64,
        right: 64,
      };
    })();

    const chartOptions = useMemo<EChartsOption>(
      () => ({
        grid: {
          left: 100,
          right: 80,
          ...gridOffset,
        },
        dataset,
        legend: { top: 16 },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // animation: false,
            type: 'cross',
          },
          position: (pos, _params, _el, _elRect, size) => {
            const obj: Record<string, number> = { top: 30 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          extraCssText: `width: 230px; z-index: ${theme.zIndex.fab}`,
        },
        xAxis: {
          type: 'category',
          scale: true,
          splitLine: { show: true },
          splitArea: {
            show: true,
          },
          ...xAxis,
        },
        yAxis: [
          {
            id: 'right',
            type: 'value',
            position: 'right',
            splitLine: { show: false },
            ...yAxis.right,
            ...getScaleYAxisOption({
              series: series.filter((s) => s.yAxisId === 'right'),
              fixedOrigin: yAxis.right?.fixedOrigin ?? false,
            }),
          },
          {
            id: 'left',
            type: 'value',
            position: 'left',
            splitLine: { show: false },
            ...yAxis.left,
            ...getScaleYAxisOption({
              series: series.filter((s) => s.yAxisId === 'left'),
              fixedOrigin: yAxis.left?.fixedOrigin ?? true,
            }),
          },
        ],
        series,
        dataZoom: {
          type: 'slider',
          realtime: false,
          ...dataZoom,
        },
      }),
      [
        dataZoom,
        dataset,
        gridOffset,
        series,
        theme.zIndex.fab,
        xAxis,
        yAxis.left,
        yAxis.right,
      ]
    );

    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') return;
      if (!state?.dataZoom?.startValue || !state?.dataZoom?.endValue) return;

      const graphInstance = ref.current?.getEchartsInstance();

      graphInstance?.dispatchAction({
        type: 'dataZoom',
        startValue: state?.dataZoom?.startValue,
        endValue: state?.dataZoom?.endValue,
      });
    }, [ref, state?.dataZoom?.startValue, state?.dataZoom?.endValue]);

    const handleOnZoom = useCallback(
      (payload: Payload, chart: ECharts) => {
        const chartOption = chart.getOption();
        const { dataZoom: dataZoomOpt = [] } = chartOption;
        const xAxisOpt = Array.isArray(chartOption.xAxis)
          ? chartOption.xAxis[0]
          : chartOption.xAxis;
        if (!xAxisOpt) return;
        if (xAxisOpt.type !== 'category') return;

        const { startValue, endValue } = Array.isArray(dataZoomOpt)
          ? dataZoomOpt[0] // is slider
          : dataZoomOpt;

        if (isFiniteNumber(startValue) && isFiniteNumber(endValue)) {
          const xAxisOptData = (xAxisOpt as { data: string[] }).data;

          const xAxisStartValue = xAxisOptData[startValue];
          const start = new Date(xAxisOptData[startValue]);
          const xAxisEndValue = xAxisOptData[endValue];
          const end = new Date(xAxisOptData[endValue]);

          const batchItem = payload?.batch?.at(0) || {};

          paramRef.current.onZoom?.(
            {
              start,
              xAxisStartIndex: startValue,
              xAxisStartValue,
              end,
              xAxisEndIndex: endValue,
              xAxisEndValue,
              ...batchItem,
            },
            chart
          );
        }
      },
      [paramRef]
    );

    const handleMouseOver = useCallback<
      NonNullable<StockGraphProps['onMouseOver']>
    >(
      (params, chart) => {
        paramRef.current.onMouseOver?.(params, chart);
      },
      [paramRef]
    );

    return (
      <Box
        sx={{
          position: 'relative',
          width: 1,
          height: 1,
        }}
      >
        <EChartsReact
          ref={ref}
          {...rest}
          style={deepmerge(
            {
              width: '100%',
              height: '100%',
            },
            canvasStyle
          )}
          option={chartOptions}
          // https://github.com/hustcc/echarts-for-react/issues/478
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          notMerge={mergeOption as any}
          onEvents={{
            dataZoom: handleOnZoom,
            mouseover: handleMouseOver,
          }}
          onChartReady={paramRef.current.onReady}
        />
      </Box>
    );
  }
);
StockGraph.displayName = 'StockGraph';

export default StockGraph;
