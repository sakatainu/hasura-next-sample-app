import {
  isStockHistoricalType,
  stockHistoricalTypeLabel,
} from '~/hooks/model/useStockHistorical';
import { format } from '~/utils';
import { StockGraphSeriesOptionTemplate, GraphSeriesOption } from './types';

const candlestickUpColor = '#4d6eff';
const candlestickDownColor = '#ff0000';

export const defaultSeriesTemplate: GraphSeriesOption = {
  graphType: 'line',
  yAxisId: 'right',
  valueFormat: (value) => format(value, { maximumFractionDigits: 1 }),
  calcMode: 'standard',
  connectNulls: true,
  lineStyle: {
    width: 2,
  },
};

export const averageSeriesTemplate: GraphSeriesOption = {
  templateName: 'average',
  name: '平均',
  graphType: 'line',
  yAxisId: 'right',
  valueFormat: (v) =>
    `${format(v, { signDisplay: 'always', maximumFractionDigits: 1 })}`,
  calcMode: 'standard',
  connectNulls: true,
  lineStyle: {
    type: 'dotted',
    width: 4,
  },
  color: '#7D7C7C',
};

const configTemplate: StockGraphSeriesOptionTemplate = {
  default: {
    name: ({ historicalName }) => {
      if (historicalName === 'stockPrice') return '株価';
      if (!isStockHistoricalType(historicalName)) return historicalName;
      return stockHistoricalTypeLabel[historicalName];
    },
    encode: ({ historicalName }) => ({
      x: 'date',
      y: historicalName,
    }),
    graphType: 'line',
    yAxisId: 'right',
    valueFormat: (value) => format(value, { maximumFractionDigits: 1 }),
    calcMode: 'standard',
    connectNulls: true,
    lineStyle: {
      width: 2,
    },
  },
  historicalTemplates: [
    {
      type: 'stockPrice',
      name: () => '株価',
      encode: () => ({
        x: 0,
        y: [1, 2, 3, 4],
        tooltip: [1, 2, 3, 4],
      }),
      itemStyle: {
        color: candlestickUpColor,
        borderColor: candlestickUpColor,
        color0: candlestickDownColor,
        borderColor0: candlestickDownColor,
      },
      yAxisId: 'right',
      graphType: 'candlestick',
      calcMode: 'standard',
    },
    {
      type: 'pbr',
      valueFormat: (v) => `${format(v, { signDisplay: 'always' })}倍`,
    },
    {
      type: 'forecastPer',
      valueFormat: (v) => `${format(v, { signDisplay: 'always' })}倍`,
    },
    {
      type: 'resultPer',
      valueFormat: (v) => `${format(v, { signDisplay: 'always' })}倍`,
    },
    {
      type: 'volume',
      unit: '株',
      tooltip: {
        valueFormat: (v) => v.toLocaleString(),
      },
    },
    {
      type: 'value',
      unit: '円',
      tooltip: {
        valueFormat: (v) => v.toLocaleString(),
      },
    },
    {
      type: 'average',
      name: () => '競合平均',
      lineStyle: {
        type: 'dotted',
        width: 4,
      },
      color: '#7D7C7C',
    },
  ],
};

export default configTemplate;
