import {
  BarSeriesOption,
  CandlestickSeriesOption,
  ECharts,
  EChartsOption,
  LineSeriesOption,
  MarkLineComponentOption,
  MouseEventParams,
  YAXisComponentOption as EChartsYAxisComponentOption,
  DataZoomComponentOption,
  XAXisComponentOption,
} from 'echarts';
import EChartsReact, { EChartsReactProps } from 'echarts-for-react';

type GraphPeriod = {
  /** @deprecated */
  start: Date;
  /** @deprecated */
  end: Date;
  xAxisStartIndex: number;
  xAxisStartValue: string;
  xAxisEndIndex: number;
  xAxisEndValue: string;
};

export type SeriesOption =
  | LineSeriesOption
  | BarSeriesOption
  | CandlestickSeriesOption;
export type StockGraphDataset = UnionToTuple<EChartsOption['dataset']>[1];

export type XAXisOption = Omit<XAXisComponentOption, 'data' | 'boundaryGap'> & {
  boundaryGap?: boolean;
  data: string[];
};

export type YAxisType = 'right' | 'left';
export type YAXisComponentOption = EChartsYAxisComponentOption & {
  name?: string;
  fixedOrigin?: boolean;
};
export type YAXisOption = {
  [key in YAxisType]?: YAXisComponentOption;
};

export type ZoomHandler = (
  value: GraphPeriod & Record<string, unknown>,
  chartInstance: ECharts
) => void;

export type StockGraphState = {
  dataZoom?: {
    startValue: string;
    endValue: string;
  };
};

export type StockGraphProps = Partial<EChartsReactProps> & {
  canvasStyle?: React.CSSProperties;
  dataset?: StockGraphDataset[];
  xAxis?: XAXisOption;
  yAxis?: YAXisOption;
  series?: SeriesOption[];
  dataZoom?: DataZoomComponentOption & {
    show?: boolean;
  };
  state?: StockGraphState;
  onReady?: (chartInstance: ECharts) => void;
  onZoom?: ZoomHandler;
  onMouseOver?: (params: MouseEventParams, chart: ECharts) => void;
};

export type StockGraphPropsWithRef = StockGraphProps & {
  ref?: React.RefObject<EChartsReact>;
};

export const isMarkLineOption = (
  value: unknown
): value is MarkLineComponentOption => {
  if (!value || typeof value !== 'object') return false;
  return 'data' in value;
};

const getMarkLineDataY = (series: SeriesOption[] = []) => {
  const markDataList = series.flatMap((s) => {
    if (!isMarkLineOption(s.markLine)) return [];
    return s.markLine?.data || [];
  });

  const markDataValues = markDataList.flatMap((markData) => {
    if (!('yAxis' in markData)) return [];
    if (markData.yAxis === undefined) return [];
    const yValue = Number(markData.yAxis);
    if (!Number.isFinite(yValue)) return [];
    return [yValue];
  });
  return markDataValues;
};

export const getScaleYAxisOption = ({
  series = [],
  fixedOrigin = false,
}: {
  series?: SeriesOption[];
  fixedOrigin?: boolean;
}): YAXisComponentOption | null => ({
  max: (value) => {
    const markLineYValues = getMarkLineDataY(series);
    const max = Math.max(...markLineYValues, value.max);
    return max + Math.abs(max) * 0.005;
  },
  min: (value) => {
    const markLineYValues = getMarkLineDataY(series);
    const min = Math.min(...markLineYValues, value.min);

    if (fixedOrigin && min >= 0) return 0;
    return min - Math.abs(min) * 0.005;
  },
});
