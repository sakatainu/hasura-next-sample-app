import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Avatar from '~/components/ui/Avatar';
import Link from '~/components/ui/Link';
import Row from '~/components/ui/Row';
import { NewsItem } from '~/hooks/model/useNewsItems';
import { format, removeLegalType, toDateString } from '~/utils';

export type NewsItemCardProps = {
  newsItems: NewsItem[];
  defaultPageIndex?: number;
};

const NewsItemCard = ({ newsItem }: { newsItem: NewsItem }) => {
  const newsStatus = newsItem.status;

  const renderNewsStatus = (
    label: React.ReactNode,
    statusValue: number | undefined
  ) => (
    <Row sx={{ justifyContent: 'space-between' }}>
      {label}
      <Typography component="span" fontWeight="bold">
        {typeof statusValue === 'number'
          ? format(statusValue, {
              signDisplay: 'always',
              style: 'percent',
              maximumFractionDigits: 1,
            })
          : ' - '}
      </Typography>
    </Row>
  );

  return (
    <Card
      elevation={0}
      sx={{
        width: 320,
        '& .MuiCardHeader-title': {
          fontSize: '1rem',
          fontWeight: 'bold',
          my: 1,
        },
        '& .MuiCardHeader-content': {
          minWidth: 0,
        },
        '& .MuiCardContent-root': {},
      }}
      // onMouseEnter={() => setShowMarkerPopover(true)}
      // onMouseLeave={() => setShowMarkerPopover(false)}
    >
      <CardHeader
        title={
          newsItem.sourceRef ? (
            <Link
              target="_blank"
              href={new URL(newsItem.sourceRef)}
              underline="hover"
            >
              {newsItem.title}
            </Link>
          ) : (
            newsItem.title
          )
        }
        subheader={
          <Row>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pr: 1,
              }}
            >
              <Avatar
                sx={{ width: 28, height: 28, fontSize: 9 }}
                label={newsItem.about.stockIssue.name}
              />
            </Box>
            <Stack sx={{ flex: '1 1 auto', maxWidth: 1 }}>
              {/* <Tooltip title={markerPopoverValue.stockIssue.name}> */}
              <Typography
                fontSize="13px"
                sx={{
                  flexGrow: 1,
                  // overflow: 'hidden',
                  // textOverflow: 'ellipsis',
                  // whiteSpace: 'nowrap',
                }}
              >
                {`(${newsItem.about.stockIssue.code}) ${removeLegalType(
                  newsItem.about.stockIssue.name
                )}`}
              </Typography>
              {/* </Tooltip> */}
              <div>
                <Typography fontSize="13px">
                  {toDateString(newsItem.timestamp, 'L LT')}
                </Typography>
              </div>
            </Stack>
          </Row>
        }
      />
      <CardContent sx={{ py: 0, fontSize: '14px' }}>
        <Box>
          {renderNewsStatus('出来高インパクト', newsStatus?.volumeImpact)}
          {renderNewsStatus('株価インパクト', newsStatus?.closeImpact)}
          {renderNewsStatus('株価変動（翌営業日後）', newsStatus?.closeRate1)}
          {renderNewsStatus('株価変動（5営業日後）', newsStatus?.closeRate5)}
        </Box>
      </CardContent>
      <CardActions>
        {!!newsItem.sourceRef && (
          <Button
            sx={{
              ml: 'auto',
            }}
            size="small"
            href={newsItem.sourceRef}
            target="_blank"
            endIcon={<OpenInNewIcon />}
          >
            記事を表示
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const pageOrigin = 1;

const BundledNewsItemCard: React.FC<NewsItemCardProps> = ({
  newsItems,
  defaultPageIndex = 0,
}) => {
  const [pageIndex, setPageIndex] = useState(defaultPageIndex);

  const handleChangePage = (_: unknown, page: number) => {
    setPageIndex(page - pageOrigin);
  };

  return (
    <Paper onBlur={(e) => e.stopPropagation()}>
      <Stack>
        {newsItems.length > 1 && (
          <Pagination
            sx={{
              pt: 2,
              px: 2,
              '&	.MuiPagination-ul': {
                justifyContent: 'space-between',
              },
            }}
            size="small"
            count={newsItems.length}
            defaultPage={defaultPageIndex + pageOrigin}
            color="secondary"
            onChange={handleChangePage}
          />
        )}
        <NewsItemCard newsItem={newsItems[pageIndex]} />
      </Stack>
    </Paper>
  );
};

export default BundledNewsItemCard;
