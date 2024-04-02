import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
  tooltipClasses,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Instance } from '@popperjs/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useToggle } from 'react-use';
import HtmlTooltip from '~/components/ui/HtmlTooltip';
import Row from '~/components/ui/Row';
import SearchKeywords from '~/components/ui/SearchKeywords';
import { NewsItem } from '~/hooks/model/useNewsItems';
import { Order } from '~/utils';
import { getComparator } from './utils';
import {
  NewsItemRow,
  NewsItemTableBodyProps,
  NewsItemTableHeadProps,
  OrderKey,
} from './types';
import columnConfigs from './config';

const NewsItemTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: NewsItemTableHeadProps) => {
  const createSortHandler =
    (property: keyof NewsItemRow) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columnConfigs.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '0.775rem',
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                }}
              >
                {headCell.label}
              </Typography>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const NewsItemTableBody = ({
  value,
  onClickGroupEventLink,
  onToggleStar,
}: NewsItemTableBodyProps) => (
  <TableBody>
    {value.map((row) => (
      <TableRow hover tabIndex={-1} key={row.id} data-id={row.id}>
        {columnConfigs.map((column) => (
          <TableCell key={column.id} {...column.cellProps}>
            {column.getContent(row, {
              value,
              onClickGroupEventLink,
              onToggleStar,
            })}
          </TableCell>
        ))}
      </TableRow>
    ))}

    {!value.length && (
      <TableRow>
        <TableCell colSpan={Object.keys(columnConfigs).length}>
          <Typography textAlign="center">
            すべてのデータが表示されました。
          </Typography>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);

export type NewsItemTableProps = {
  values?: NewsItem[];
  canEditEvent?: boolean;
  onClickAddEvent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickGroupEventLink?: (
    groupEventId: string,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onToggleStar?: (newsItem: NewsItem) => void;
  onChangeFilter?: (
    e: React.SyntheticEvent,
    payload: {
      filterFn: (newsItem: NewsItem) => boolean;
    }
  ) => void;
};

const NewsItemTable = ({
  values = [],
  canEditEvent = true,
  onClickAddEvent,
  onClickGroupEventLink,
  onToggleStar,
  onChangeFilter,
}: NewsItemTableProps) => {
  const [order, setOrder] = useState<Order>('desc');

  const [orderBy, setOrderBy] = useState<OrderKey>('timestamp');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const searchHelperRef = useRef<Instance>(null);
  const searchBoxRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchKeywords, setShowSearchKeywords] = useToggle(false);
  const [showOnlyStar, setShowOnlyStar] = useToggle(false);

  const newsCondition = useMemo(
    () => ({
      searchQuery,
      showOnlyStar,
    }),
    [searchQuery, showOnlyStar]
  );

  const getFilterFn = useCallback(
    (condition: typeof newsCondition) =>
      (value: NewsItem): boolean => {
        if (condition.showOnlyStar && !value.hasStar) return false;
        if (value.title.includes(condition.searchQuery)) return true;
        if (value.category.label.includes(condition.searchQuery)) return true;
        if (value.type.label.includes(condition.searchQuery)) return true;
        if (value.about.stockIssue.name.includes(condition.searchQuery))
          return true;

        return false;
      },
    []
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NewsItemRow
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterFn = getFilterFn({
      ...newsCondition,
      searchQuery: e.currentTarget.value,
    });
    onChangeFilter?.(e, { filterFn });

    setSearchQuery(e.currentTarget.value);
    setPage(0);
  };

  const handleClickSearchKeyword: React.MouseEventHandler<HTMLElement> = (
    e
  ) => {
    const { keyword = '' } = e.currentTarget.dataset;
    let newSearchQuery = searchQuery.trim();
    newSearchQuery = newSearchQuery ? `${newSearchQuery} ${keyword}` : keyword;

    const filterFn = getFilterFn({
      ...newsCondition,
      searchQuery: newSearchQuery,
    });

    onChangeFilter?.(e, { filterFn });

    setSearchQuery(newSearchQuery);
    searchBoxRef.current?.focus();
  };

  const handleToggleStar =
    (showStar: boolean): React.MouseEventHandler<HTMLElement> =>
    (e) => {
      const filterFn = getFilterFn({
        ...newsCondition,
        showOnlyStar: showStar,
      });
      onChangeFilter?.(e, { filterFn });

      setShowOnlyStar(showStar);
    };

  const handleBlurSearchBox = () => {
    setTimeout(() => {
      const searchHelper = document.getElementsByClassName('searchHelper')[0];
      const isSearchKeywords = searchHelper?.contains(document.activeElement);
      setShowSearchKeywords(isSearchKeywords);
      setPage(0);
    }, 10);
  };

  const fixedRows = useMemo(
    () =>
      values
        .sort(getComparator(columnConfigs, order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, values]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Toolbar
        sx={{
          pl: 1,
        }}
      >
        <Typography variant="h6" mr={6}>
          ニュース一覧
        </Typography>
        <Row
          gap={4}
          sx={{
            alignItems: 'center',
          }}
        >
          {canEditEvent && (
            <Button
              variant="contained"
              disableElevation
              onClick={onClickAddEvent}
            >
              イベント登録
            </Button>
          )}
          <FormControl>
            <TextField
              inputRef={searchBoxRef}
              name="searchQuery"
              margin="dense"
              type="search"
              variant="standard"
              size="small"
              value={searchQuery}
              onChange={handleChangeSearchQuery}
              // onClick={() => setShowSearchKeywords(true)}
              onFocus={() => setShowSearchKeywords(true)}
              onBlur={handleBlurSearchBox}
              // inputRef={searchBoxInputRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                placeholder: 'ニュースを検索',
                autoComplete: 'off',
              }}
            />
          </FormControl>
        </Row>
      </Toolbar>
      <Row
        gap={1}
        sx={{
          alignItems: 'center',
          pl: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            flexShrink: 0,
            lineHeight: ({ typography }) => typography.caption.fontSize,
          }}
        >
          表示:
        </Typography>
        <Row
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography
            variant="caption"
            sx={{
              cursor: 'pointer',
              borderBottom: ({ palette }) =>
                !showOnlyStar ? `1px solid ${palette.primary.main}` : 'none',
            }}
            onClick={handleToggleStar(false)}
          >
            すべて
          </Typography>
          <Typography
            variant="caption"
            sx={{
              cursor: 'pointer',
              borderBottom: ({ palette }) =>
                showOnlyStar ? `1px solid ${palette.primary.main}` : 'none',
            }}
            onClick={handleToggleStar(true)}
          >
            スターのみ
          </Typography>
        </Row>
      </Row>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <NewsItemTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <NewsItemTableBody
            value={fixedRows}
            onClickGroupEventLink={onClickGroupEventLink}
            onToggleStar={onToggleStar}
          />
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="1ページあたりの行数"
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={values.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <HtmlTooltip
        className="searchHelper"
        open={showSearchKeywords}
        title={<SearchKeywords onClick={handleClickSearchKeyword} />}
        PopperProps={{
          popperRef: searchHelperRef,
          anchorEl: searchBoxRef.current,
        }}
        sx={{
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'transparent',
            border: 'none',
          },
        }}
      >
        <Box sx={{ width: 0, height: 0 }} />
      </HtmlTooltip>
    </Box>
  );
};

export default NewsItemTable;
