import {
  CandlestickChartOutlined as CandlestickChartOutlinedIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import React from 'react';
import { AggregateType } from '~/components/ui/GraphEditorTopToolbar/AggregateMenu';

import { MenuButtonProps } from '~/components/ui/MenuButton';
import { NewsMarkerType } from '~/components/ui/StockGraphEditor';
import {
  StockHistoricalType,
  TechnicalType,
  technicalTypeMap as baseTechnicalTypeMap,
  indicatorTypes,
  stockHistoricalTypeLabel,
} from '~/hooks/model/useStockHistorical';
import { CustomSyntheticEventHandler } from '~/utils';

export type NewsOptionMenuProps = {
  selectedNewsTypes?: NewsMarkerType[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    payload: {
      target: NewsMarkerType | 'all';
      list: NewsMarkerType[];
    }
  ) => void;
};

export type IndicatorGoalMenuProps = {
  value?: {
    showIndicatorGoal: boolean;
  };
  disableIndicatorGoal?: boolean;
  onChange?: (
    event: React.ChangeEvent<unknown>,
    payload: {
      target: {
        showIndicatorGoal: boolean;
      };
    }
  ) => void;
  onClickIndicatorGoalSetting?: React.MouseEventHandler<HTMLElement>;
};

export type GraphEditorTopToolbarValue = {
  stockIssue?: StockIssue;
  selectedStockPriceStyle?: StockPriceStyle;
  selectedIndicator?: IndicatorOptionName;
  selectedTechnicals?: TechnicalType[];
  selectedStockIndexes?: StockIndexType[];
  selectedNewsTypes?: NewsMarkerType[];
  selectedAggregateTypes?: AggregateType[];
  showPrivateCompany?: boolean;
  showIndicatorGoal?: boolean;
};

export type GraphEditorTopToolbarConfig = {
  stockPriceStyle?: StockPriceStyle[];
  isStockPricePermanent?: boolean;
  disableStockPriceLabel?: boolean;
  disableTechnical?: boolean;
  disableIndicatorGoal?: boolean;
  indicatorOptions?: IndicatorOptions;
  stockIndexTypes?: StockIndexType[];
  hideTechnicalOption?: boolean;
  showIndicatorGoalOption?: boolean;
  hideStockIssue?: boolean;
  hideNewsOption?: boolean;
};

export type GraphEditorTopToolbarProps = {
  loading?: boolean;
  value?: GraphEditorTopToolbarValue;
  config?: GraphEditorTopToolbarConfig;
  // TODO: フラグによるメニューの表示制御をやめ、表示するメニューを指定するようにする
  items?: React.ReactNode[];
  onChangeSeriesType?: (
    target: StockPriceStyle,
    e?: React.MouseEvent<HTMLElement>
  ) => void;
  onChangeIndicator?: MenuButtonProps['onChange'];
  onChangeTechnicals?: MenuButtonProps['onChange'];
  onResetTechnicals?: () => void;
  onChangeStockIndexes?: MenuButtonProps['onChange'];
  onChangeNewsTypes?: NewsOptionMenuProps['onChange'];
  onChangeAggregateTypes?: CustomSyntheticEventHandler<
    HTMLElement,
    Event,
    { target: AggregateType[] }
  >;
  onClickShowPrivateCompany?: React.MouseEventHandler<HTMLButtonElement>;
  onCsvDownload?: () => void;
  onClickChangeStockIssue?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditLiquidityShareSource?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  >;
  onChangeShowIndicatorGoal?: () => void;
  onClickIndicatorGoalSetting?: React.MouseEventHandler<HTMLElement>;
};

export const stockPriceStyles = ['candlestick', 'line'] as const;
export type StockPriceStyle = (typeof stockPriceStyles)[number];
export const stockPriceStyleLabels: Record<StockPriceStyle, string> = {
  candlestick: 'ローソク足',
  line: '折れ線',
};

export const seriesTypeIcon: Record<StockPriceStyle, React.ReactElement> = {
  candlestick: React.createElement(CandlestickChartOutlinedIcon, null),
  line: React.createElement(ShowChartIcon, null),
};

export const indicatorOptionNames = ['stockPrice', ...indicatorTypes] as const;
export type IndicatorOptionName = (typeof indicatorOptionNames)[number];

export const isIndicatorOptionName = (
  value: Nullish<string>
): value is IndicatorOptionName => indicatorOptionNames.includes(value);

export type IndicatorOptionGroupName = 'line' | 'bar';
export const indicatorOptionGroupLabel: Record<
  IndicatorOptionGroupName,
  string
> = {
  line: '折れ線グラフ',
  bar: '棒グラフ',
};

export type IndicatorOptions = Dictionary<
  IndicatorOptionGroupName,
  IndicatorOptionName[]
>;

export const defaultIndicatorOptions: IndicatorOptions = {
  line: [...indicatorOptionNames],
};

export const historicalTypeLabels: Record<
  StockHistoricalType | 'stockPrice',
  string
> = {
  ...stockHistoricalTypeLabel,
  stockPrice: '株価',
};

export const technicalTypeMap: Dictionary<
  IndicatorOptionName,
  TechnicalType[]
> = {
  ...baseTechnicalTypeMap,
  stockPrice: ['closeAverage5', 'closeAverage25', 'closeAverage75'],
};

export const stockIndexTypes = ['ni225', 'topix', 'mothers'] as const;
export type StockIndexType = (typeof stockIndexTypes)[number];
export const stockIndexLabel: Record<StockIndexType, string> = {
  ni225: '日経平均',
  topix: 'TOPIX',
  mothers: 'マザーズ指数',
};

export const newsTypes = [
  'news',
  'kessan',
  'yuuhou',
  'otherIr',
  'prNews',
  'groupEvent',
] as const;
export type NewsType = (typeof newsTypes)[number];
export const newsTypeLabel: Record<NewsType, string> = {
  news: 'ニュース',
  kessan: '決算情報',
  yuuhou: '有価証券報告書等',
  otherIr: 'その他適時開示等',
  prNews: 'PR情報',
  groupEvent: '登録イベント',
};
