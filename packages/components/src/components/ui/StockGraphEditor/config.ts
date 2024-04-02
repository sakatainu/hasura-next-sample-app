import dayjs from 'dayjs';
import { ArticleSourceType, NewsItem } from '~/hooks/model/useNewsItems';

export type NewsType = ArticleSourceType | 'groupEvent';

export const newsMarkerTypes = [
  'news',
  'kessan',
  'yuuhou',
  'groupEvent',
] as const;

export type NewsMarkerType = (typeof newsMarkerTypes)[number];

export const isNewsMarkerType = (value: unknown): value is NewsMarkerType =>
  newsMarkerTypes.includes(value);

export type NewsMarkerPinConfig = {
  type: NewsMarkerType;
  label: string;
  markerColor: string;
  isTarget: (value: NewsItem) => boolean;
};

export const newsMarkerPinConfigs: NewsMarkerPinConfig[] = [
  {
    type: 'kessan',
    label: '決算情報（含その他適時開示等）',
    markerColor: '#a9c25c',
    isTarget: (value) =>
      value.category.code === 'ir' && value.type.code !== 'yuuhou',
  },
  {
    type: 'yuuhou',
    label: '有価証券報告書等',
    markerColor: '#efa14c',
    isTarget: (value) =>
      value.category.code === 'ir' && value.type.code === 'yuuhou',
  },
  {
    type: 'news',
    label: 'ニュース（含PR情報）',
    markerColor: '#e08081',
    isTarget: (value) => value.category.code === 'news',
  },
  {
    type: 'groupEvent',
    label: '登録イベント',
    markerColor: '#e8003e',
    isTarget: (value) => value.category.code === 'groupEvent',
  },
];

export const mixedMarkerStyle = {
  color: '#928f8f',
};
export const getNewsMarkerType = (news: NewsItem): NewsMarkerType | undefined =>
  newsMarkerPinConfigs.find((v) => v.isTarget(news))?.type;

export const getNewsMarkerPinConfig = (
  news: NewsItem
): NewsMarkerPinConfig | undefined =>
  newsMarkerPinConfigs.find((v) => v.isTarget(news));

export const barColor = '#bcd2ff';
export const candlestickUpColor = '#ff0000';
export const candlestickDownColor = '#4d6eff';
export const candlestickStyle = {
  color: candlestickUpColor,
  borderColor: candlestickUpColor,
  color0: candlestickDownColor,
  borderColor0: candlestickDownColor,
};

export const zoomPresetTypes = ['1M', '3M', '6M', '1Y', 'all'] as const;
export type ZoomPresetType = (typeof zoomPresetTypes)[number];

export type ZoomPreset = {
  key: ZoomPresetType;
  label: string;
  amount: number;
  unit?: 'day' | 'month' | 'year';
};

export const zoomPresets: ZoomPreset[] = [
  {
    key: '1M',
    label: '1カ月',
    amount: 1,
    unit: 'month',
  },
  {
    key: '3M',
    label: '3カ月',
    amount: 3,
    unit: 'month',
  },
  {
    label: '6カ月',
    key: '6M',
    amount: 6,
    unit: 'month',
  },
  {
    label: '1年',
    key: '1Y',
    amount: 1,
    unit: 'year',
  },
  {
    label: 'すべて',
    key: 'all',
    amount: 0,
  },
];

export const getZoomPreset = (key: ZoomPresetType): ZoomPreset =>
  zoomPresets.find((v) => v.key === key)!;

export const getPeriodByZoomPreset = (
  zoomPresetType: ZoomPresetType,
  dates: Date[]
):
  | {
      start: Date;
      withinStart: Date;
      end: Date;
      withinEnd: Date;
    }
  | undefined => {
  if (!dates.length) return undefined;

  const currentPrest = getZoomPreset(zoomPresetType);

  const endDate = dates[dates.length - 1];

  if (currentPrest.key === 'all') {
    return {
      start: dates[0],
      withinStart: dates[0],
      end: endDate,
      withinEnd: endDate,
    };
  }

  const startDate = dayjs(endDate)
    .add(-currentPrest.amount, currentPrest.unit)
    .toDate();

  const withinStartDate = dates.find((v) =>
    dayjs(v).isSameOrAfter(startDate, 'date')
  );

  return {
    start: startDate,
    withinStart: withinStartDate || endDate,
    end: endDate,
    withinEnd: endDate,
  };
};
