import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { numberCompare } from '~/utils';
import NewsTitle from './NewsTitle';
import { HeadCell } from './types';
import { formatPerformance } from './utils';

const columnConfigs: readonly HeadCell[] = [
  {
    id: 'timestamp',
    label: '日時',
    comparator: (orderBy) => (a, b) =>
      (a.timestamp.getTime() - b.timestamp.getTime()) *
      (orderBy === 'desc' ? -1 : 1),
    getContent: (value) => dayjs(value.timestamp).format('L LT'),
  },
  {
    id: 'hasStar',
    label: '',
    cellProps: { align: 'center' },
    comparator: (orderBy) => (a, b) =>
      (Number(a.hasStar) - Number(b.hasStar)) * (orderBy === 'desc' ? -1 : 1),
    getContent: (value, { onToggleStar }) => (
      <IconButton
        size="small"
        color="primary"
        onClick={() => onToggleStar?.(value)}
      >
        {value.hasStar ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    ),
  },
  {
    id: 'stockIssueName',
    label: '企業名',
    comparator: (orderBy) => (a, b) =>
      a.about.stockIssue.code.localeCompare(b.about.stockIssue.code) *
      (orderBy === 'desc' ? -1 : 1),
    getContent: (value) => value.about.stockIssue.name,
  },
  {
    id: 'category',
    label: '区分',
    comparator: (orderBy) => (a, b) =>
      a.category.code.localeCompare(b.category.code) *
      (orderBy === 'desc' ? -1 : 1),
    getContent: (value) => value.category.label,
  },
  {
    id: 'type',
    label: 'ニュース種別',
    comparator: (orderBy) => (a, b) =>
      a.type.code.localeCompare(b.type.code) * (orderBy === 'desc' ? -1 : 1),
    getContent: (value) => value.type.label,
  },
  {
    id: 'description',
    label: 'タイトル',
    comparator: (orderBy) => (a, b) =>
      a.title.localeCompare(b.title) * (orderBy === 'desc' ? -1 : 1),
    getContent: (value, { onClickGroupEventLink }) => (
      <NewsTitle value={value} onClick={onClickGroupEventLink} />
    ),
  },
  {
    id: 'volume',
    label: '出来高',
    cellProps: { align: 'right' },
    comparator: (orderBy) => (a, b) =>
      numberCompare(orderBy)(a.status?.volume, b.status?.volume),
    getContent: ({ status }) => {
      if (status?.volume === undefined) return ' - ';
      return status?.volume.toLocaleString();
    },
  },
  {
    id: 'volumeImpact',
    label: '出来高インパクト',
    cellProps: { align: 'right' },
    comparator: (orderBy) => (a, b) =>
      numberCompare(orderBy)(a.status?.volumeImpact, b.status?.volumeImpact),
    getContent: ({ status }) => formatPerformance(status?.volumeImpact),
  },
  {
    id: 'closeRate1',
    label: '株価変動 （翌営業日）',
    cellProps: { align: 'right' },
    comparator: (orderBy) => (a, b) =>
      numberCompare(orderBy)(a.status?.closeRate1, b.status?.closeRate1),
    getContent: ({ status }) => formatPerformance(status?.closeRate1),
  },
  {
    id: 'closeImpact',
    label: '株価インパクト',
    cellProps: { align: 'right' },
    comparator: (orderBy) => (a, b) =>
      numberCompare(orderBy)(a.status?.closeImpact, b.status?.closeImpact),
    getContent: ({ status }) => formatPerformance(status?.closeImpact),
  },
];

export default columnConfigs;
