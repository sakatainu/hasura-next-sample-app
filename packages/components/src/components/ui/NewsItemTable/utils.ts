import { NewsItem } from '~/hooks/model/useNewsItems';
import { Order, format } from '~/utils';
import { ColumnConfigs, NewsItemRow } from './types';

export const getComparator = (
  columnConfigs: ColumnConfigs,
  order: Order,
  orderBy: keyof NewsItemRow | undefined
): ((a: NewsItem, b: NewsItem) => number) => {
  const cellOption = columnConfigs.find((v) => v.id === orderBy);
  if (!cellOption) {
    return (x, y) =>
      (x.timestamp.getTime() - y.timestamp.getTime()) *
      (order === 'desc' ? -1 : 1);
  }

  return cellOption.comparator(order);
};

export const formatPerformance = (value: number | undefined) => {
  if (value === undefined) return ' - ';

  return format(value, {
    signDisplay: 'always',
    style: 'percent',
    maximumFractionDigits: 1,
  });
};
