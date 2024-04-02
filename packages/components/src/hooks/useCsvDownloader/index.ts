import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import FileDownloader from '~/utils/fileDownloader';
import {
  StockHistoricalEntry,
  StockHistoricalType,
  stockHistoricalTypeLabel,
} from '~/hooks/model/useStockHistorical';

export type CsvDownloaderKeyMapType = StockHistoricalType;

type CsvDownloaderParam = {
  keyMap: CsvDownloaderKeyMapType[];
  stockHistoricalEntries: StockHistoricalEntry[];
  zoomPeriod?: Period;
};

const baseKeyMapLabels = ['日付', '銘柄コード', '銘柄名'];

const useCsvDownloader = ({
  keyMap,
  stockHistoricalEntries,
  zoomPeriod,
}: CsvDownloaderParam) => {
  const doDownload = useCallback(
    (
      fileName = 'csv_download.csv',
      options?: {
        calculateAverageByDate?: boolean;
      }
    ) => {
      if (!zoomPeriod) return;

      const inputLabels = keyMap.map((key) => stockHistoricalTypeLabel[key]);
      const $dataset: { [key: string]: (string | number)[] } = {};

      const headers = [...baseKeyMapLabels, ...inputLabels];

      stockHistoricalEntries.forEach((entry) => {
        entry.items
          .at(0)
          ?.data.filter((v) =>
            dayjs(v.date).isBetween(
              dayjs(zoomPeriod.start),
              dayjs(zoomPeriod.end),
              null,
              '[]'
            )
          )
          .forEach((v) => {
            const key = `${entry.stockIssueCode}-${v.dateString}`;
            $dataset[key] = [
              dayjs(v.date).format('YYYY/MM/DD'),
              entry.stockIssueCode,
              entry.stockIssueName,
            ];
          });

        keyMap.forEach((key, index) => {
          entry.items
            .filter((v) => v.type === key)
            .flatMap((v) => v.data)
            .filter((v) =>
              dayjs(v.date).isBetween(
                dayjs(zoomPeriod.start),
                dayjs(zoomPeriod.end),
                null,
                '[]'
              )
            )
            .forEach((v) => {
              const datasetKey = `${entry.stockIssueCode}-${v.dateString}`;
              $dataset[datasetKey][index + baseKeyMapLabels.length] = v.value;
            });
        });
      });

      const dataset = Object.values($dataset);

      const aggregateDataset: (string | number)[][] = [];
      if (options?.calculateAverageByDate) {
        const dateMap: { [key: string]: number[][] } = {};

        dataset.forEach((data) => {
          const date = data[0] as string;
          const values = data
            .slice(baseKeyMapLabels.length)
            .map((v) => Number(v));

          if (!dateMap[date]) {
            dateMap[date] = [];
          }

          dateMap[date].push(values);
        });

        Object.entries(dateMap).forEach(([date, values]) => {
          const averageValues = values[0].map(
            (_, index) =>
              Math.round(
                (values.reduce((acc, cur) => acc + cur[index], 0) /
                  values.length) *
                  100
              ) / 100
          );

          aggregateDataset.push([date, '-', '平均値', ...averageValues]);
        });
      }

      FileDownloader.downloadCsv(fileName, [
        headers,
        ...aggregateDataset,
        ...dataset,
      ]);
    },
    [keyMap, stockHistoricalEntries, zoomPeriod]
  );

  return useMemo(
    () => ({
      doDownload,
    }),
    [doDownload]
  );
};

export default useCsvDownloader;
