import { TableCellProps } from '@mui/material';
import { NewsItem } from '~/hooks/model/useNewsItems';
import { Order } from '~/utils';

export type OrderKey = keyof NewsItemRow | undefined;

export type NewsItemRow = {
  timestamp: Date;
  hasStar: boolean;
  stockIssueName: string;
  category: string;
  type: string;
  description: string;
  closeRate1: number;
  closeRate5: number;
  closeImpact: number;
  volumeImpact: number;
  volume: number;
  volumeRate1: number;
};

export type NewsItemTableHeadProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof NewsItemRow
  ) => void;
  order: Order;
  orderBy: OrderKey;
};

export type NewsItemTableBodyProps = {
  value: NewsItem[];
  onClickGroupEventLink?: (
    groupEventId: string,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onToggleStar?: (newsItem: NewsItem) => void;
};

export type HeadCell = {
  id: keyof NewsItemRow;
  label: string;
  cellProps?: TableCellProps;
  comparator: (orderBy: Order) => (a: NewsItem, b: NewsItem) => number;
  getContent: (
    value: NewsItem,
    context: NewsItemTableBodyProps
  ) => React.ReactNode;
};

export type ColumnConfigs = readonly HeadCell[];
