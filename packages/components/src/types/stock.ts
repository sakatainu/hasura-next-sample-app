// 株関連の定義

import { RangeStockIssueSummaryRecords } from '@sample/components/generated/graphql';
import { abbreviateToParts, format, formatNumber } from '~/utils';

export const indicatorTypes = [
  'close',
  'open',
  'high',
  'low',
  /** 出来高 */
  'volume',
  /** 売買代金 */
  'value',
  /** 予想PER */
  'forecastPer',
  /** 実績PER */
  'resultPer',
  /** PBR */
  'pbr',
  /** 流通株式時価総額 */
  'liquidityMarketCapitalization',
  /** プライム連動指数 */
  'tsePrimeIndicator',
  /** スタンダード連動指数 */
  'tseStandardIndicator',
  /** グロース連動指数 */
  'tseGrowthIndicator',
  /** 時価総額 */
  'marketCapitalization',
] as const;
export type IndicatorType = (typeof indicatorTypes)[number];

export const isIndicatorType = (v: string): v is IndicatorType =>
  indicatorTypes.includes(v);

export const technicalTypes = [
  /** 株価変動（翌営業日後） */
  'closeRate1',
  /** 株価変動（5営業日後） */
  'closeRate5',
  /** 株価インパクト */
  'closeImpact',

  /** 出来高変動（翌営業日後） */
  'volumeRate1',
  /** 出来高変動（5営業日後） */
  'volumeRate5',
  /** 出来高インパクト */
  'volumeImpact',

  /** 株価移動平均（5） */
  'closeAverage5',
  /** 株価移動平均（25） */
  'closeAverage25',
  /** 株価移動平均（75） */
  'closeAverage75',

  /** 出来高移動平均（5） */
  'volumeAverage5',
  /** 出来高移動平均（25） */
  'volumeAverage25',
  /** 出来高移動平均（75） */
  'volumeAverage75',

  /** 売買代金移動平均（5） */
  'valueAverage5',
  /** 売買代金移動平均（25） */
  'valueAverage25',
  /** 売買代金移動平均（75） */
  'valueAverage75',

  /** 流通株式時価総額（3カ月平均） */
  'liquidityMarketCapitalizationAverage3MonthsPast',
] as const;

export const isTechnicalType = (
  value: Nullish<string>
): value is TechnicalType => technicalTypes.includes(value);

export const hasTechnical = (type: string): boolean =>
  ['close', 'value', 'volume'].includes(type);

export type TechnicalType = (typeof technicalTypes)[number];

export const stockHistoricalTypes = [
  ...indicatorTypes,
  ...technicalTypes,
] as const;
export type StockHistoricalType = (typeof stockHistoricalTypes)[number];

export const isStockHistoricalType = (
  value: unknown
): value is StockHistoricalType => stockHistoricalTypes.includes(value);

export const stockHistoricalTypeLabel: Record<StockHistoricalType, string> = {
  close: '株価',
  open: '始値',
  high: '高値',
  low: '安値',
  volume: '出来高',
  value: '売買代金',
  forecastPer: '予想PER',
  resultPer: '実績PER',
  pbr: '実績PBR',
  liquidityMarketCapitalization: '流通株式時価総額',
  // NOTE: rateは取得元によって前後が異なるため注意
  closeRate1: '株価前日比',
  closeRate5: '株価5日前比',
  closeImpact: '株価インパクト',
  volumeRate1: '出来高前日比',
  volumeRate5: '出来高5日前比',
  volumeImpact: '出来高インパクト',
  closeAverage5: '株価移動平均 (5)',
  closeAverage25: '株価移動平均 (25)',
  closeAverage75: '株価移動平均 (75)',
  volumeAverage5: '出来高移動平均 (5)',
  volumeAverage25: '出来高移動平均 (25)',
  volumeAverage75: '出来高移動平均 (75)',
  valueAverage5: '売買代金移動平均 (5)',
  valueAverage25: '売買代金移動平均 (25)',
  valueAverage75: '売買代金移動平均 (75)',
  liquidityMarketCapitalizationAverage3MonthsPast:
    '流通株式時価総額（3カ月平均）',
  tsePrimeIndicator: 'プライム連動指数',
  tseStandardIndicator: 'スタンダード連動指数',
  tseGrowthIndicator: 'グロース連動指数',
  marketCapitalization: '時価総額',
};

export type StockHistoricalRecordData = {
  dateString: DateString;
  date: Date;
  value: number;
};

export type StockHistoricalRecord = {
  type: StockHistoricalType;
  data: StockHistoricalRecordData[];
};

export type StockHistoricalEntry = {
  stockIssueName: string;
  stockIssueCode: StockIssueCode;
  items: StockHistoricalRecord[];
};

export const technicalTypeMap: Dictionary<IndicatorType, TechnicalType[]> = {
  close: ['closeAverage5', 'closeAverage25', 'closeAverage75'],
  volume: ['volumeAverage5', 'volumeAverage25', 'volumeAverage75'],
  value: ['valueAverage5', 'valueAverage25', 'valueAverage75'],
  liquidityMarketCapitalization: [
    'liquidityMarketCapitalizationAverage3MonthsPast',
  ],
};

const formatter = (fn: (v: number) => string) => (v: Nullish<number>) => {
  if (v == null) return '-';
  if (Number.isNaN(v)) return '-';
  return fn(v);
};

const indicatorFormatter: Dictionary<
  StockHistoricalType,
  (v: Nullish<number>) => string
> = {
  close: formatter((value) => `${formatNumber({ value, decimal: 0 })}`),
  closeRate1: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  closeRate5: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  closeImpact: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  volume: formatter((value) => `${formatNumber({ value })}`),
  volumeRate1: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  volumeRate5: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  volumeImpact: formatter((value) =>
    format(value * 100, {
      signDisplay: 'always',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ),
  forecastPer: formatter((value) => `${formatNumber({ value, decimal: 2 })}`),
  pbr: formatter((value) => `${formatNumber({ value, decimal: 2 })}`),
  marketCapitalization: formatter(
    (value) =>
      abbreviateToParts(value, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })[0]
  ),
  liquidityMarketCapitalization: formatter(
    (value) =>
      abbreviateToParts(value, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })[0]
  ),
};

type RangeStockIssueSummaryType = keyof RangeStockIssueSummaryRecords;
export type CombinedStockType =
  | StockHistoricalType
  | RangeStockIssueSummaryType;

const historicalTypeIndicators: Dictionary<
  StockHistoricalType,
  CombinedStockType[]
> = {
  close: ['fromClose', 'toClose'],
  closeRate1: ['closeRate', 'closeRate5'],
  closeImpact: [
    'closeImpact',
    'averageCloseImpactRate',
    'fromAverageCloseImpact',
    'toAverageCloseImpact',
  ],
  volume: ['fromAverageVolume', 'toAverageVolume'],
  volumeRate1: ['averageVolumeRate', 'volumeRate5'],
  volumeImpact: ['fromAverageVolumeImpact', 'toAverageVolumeImpact'],
  forecastPer: ['fromAverageForecastPer', 'toAverageForecastPer'],
  pbr: ['fromAveragePbr', 'toAveragePbr'],
  marketCapitalization: [
    'fromAverageMarketCapitalization',
    'toAverageMarketCapitalization',
  ],
  liquidityMarketCapitalization: [
    'fromAverageLiquidityMarketCapitalization',
    'toAverageLiquidityMarketCapitalization',
  ],
  // tsePrimeIndicator: ['fromAverageIndicator', 'toAverageIndicator'],
};

const getIndicatorTypeFromRangeStockIssueSummaryType = (
  type: CombinedStockType
): StockHistoricalType | null =>
  Object.entries(historicalTypeIndicators).find(
    ([k, v]) => v.includes(type) || k === type
  )?.[0] ?? null;

export const getIndicatorFormatter = (type: CombinedStockType) => {
  const indicatorType = getIndicatorTypeFromRangeStockIssueSummaryType(type);

  if (!indicatorType) return (v: Nullish<number>) => v?.toString() ?? '-';

  return indicatorFormatter[indicatorType];
};

export const indicatorUnit: Dictionary<
  StockHistoricalType,
  (value: Nullish<number>) => string
> = {
  close: () => '円',
  closeRate1: () => '%',
  closeRate5: () => '%',
  closeImpact: () => '%',
  volumeRate1: () => '%',
  volumeRate5: () => '%',
  volumeImpact: () => '%',
  forecastPer: () => '倍',
  pbr: () => '倍',
  marketCapitalization: (value) => `${abbreviateToParts(value)[1]}円`,
  liquidityMarketCapitalization: (value) => `${abbreviateToParts(value)[1]}円`,
};
