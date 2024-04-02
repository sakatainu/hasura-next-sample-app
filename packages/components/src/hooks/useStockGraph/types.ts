import { DatasetComponentOption, LineSeriesOption } from 'echarts';
import { YAxisType } from '~/components/ui/StockGraph';
import {
  StockHistoricalType,
  IndicatorType as StockIndicatorType,
} from '~/hooks/model/useStockHistorical';

export type IndicatorType = 'stockPrice' | StockIndicatorType;

export type StockHistoricalName = 'stockPrice' | StockHistoricalType;

export type StockHistoricalRecordValue = {
  dateString: DateString;
  date: Date;
  value: number;
};

export type StockHistoricalRecord = {
  type: StockHistoricalName;
  data: StockHistoricalRecordValue[];
};

export type StockHistoricalData = {
  stockIssueName: string;
  stockIssueCode: StockIssueCode;
  items: StockHistoricalRecord[];
};

export type StockGraphSeriesConfigContext = {
  historicalName: string;
  stockIssue: {
    stockIssueCode: StockIssueCode;
    stockIssueName: string;
  } | null;
};

/** @deprecated GraphSeriesOption に移行 */
export type StockGraphSeriesConfig = {
  name: (context: StockGraphSeriesConfigContext) => string;
  graphType: 'line' | 'candlestick' | 'bar';
  encode: (
    context: StockGraphSeriesConfigContext
  ) => LineSeriesOption['encode'];
  yAxisId: YAxisType;
  yAxisFixedOrigin?: boolean;
  valueFormat: (value: number) => string;
  unit?: string;
  calcMode: 'standard' | 'performance';
  itemStyle?: Record<string, string | number>;
  color?: string;
  tooltip?: {
    valueFormat: (value: number) => string;
  };
  dataConverter?: (
    value: StockHistoricalRecordValue[]
  ) => [DateString, number][];
  connectNulls?: boolean;
  lineStyle?: LineSeriesOption['lineStyle'];
  smooth?: boolean;
};

export type StockGraphSeriesOptionTemplate = {
  default: StockGraphSeriesConfig;
  historicalTemplates?: (Partial<StockGraphSeriesConfig> & {
    type: string;
  })[];
};

export type StockGraphSeriesOverridableConfig = {
  default?: Partial<StockGraphSeriesConfig>;
  historicalTemplates?: (Partial<StockGraphSeriesConfig> & {
    type: StockHistoricalName;
  })[];
};

/** @deprecated CoordPoint に移行 */
export type Dataset = Omit<DatasetComponentOption, 'id' | 'source'> & {
  id: string;
  source: (string | number)[][];
};

export type CoordPoint =
  | {
      x: string;
      y: number;
    }
  | {
      x: string;
      y: number;
      open: number;
      high: number;
      low: number;
    };

export type GraphSeriesOption = {
  id?: string;
  name?: string;
  templateName?: string;
  graphType?: 'line' | 'candlestick' | 'bar';
  /**
   * 左軸 or 右軸
   * @default 'right'
   */
  yAxisId?: YAxisType;
  yAxisLabel?: string;
  /**
   * y軸の原点を0に固定するか
   * @default false
   */
  yAxisFixedOrigin?: boolean;
  /**
   * y軸の目盛、ポインター、ツールチップの値のフォーマット
   */
  valueFormat?: (value: number) => string;
  /**
   * y軸の単位
   */
  unit?: string;
  /**
   * 計算モード
   * standard: 値をそのまま表示
   * performance: 前日比を計算して表示
   * @default 'performance'
   */
  calcMode?: 'standard' | 'performance';
  /**
   * 計算の基準となる値
   * number: 固定値
   * zoomStart: ズーム開始時の値
   * @default 0
   */
  calcOrigin?: number | 'zoomStart';
  itemStyle?: Record<string, string | number>;
  color?: string;
  /**
   * ツールチップの値のフォーマット
   */
  'tooltip.valueFormat'?: (value: number) => string;
  connectNulls?: boolean;
  lineStyle?: LineSeriesOption['lineStyle'];
  smooth?: boolean;
  dataConverter?: (value: CoordPoint[]) => CoordPoint[];
  dataSource?: CoordPoint[];
};

export const AggregateTypes = ['average'] as const;
export type AggregateType = (typeof AggregateTypes)[number];
