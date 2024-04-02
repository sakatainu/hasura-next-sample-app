import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Box, Button, LinearProgress, Stack, Tab, Tabs } from '@mui/material';
import dayjs from 'dayjs';
import EChartsReact from 'echarts-for-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import Row from '~/components/ui/Row';
import StockGraph, { StockGraphProps } from '~/components/ui/StockGraph';
import {
  dateFormat,
  getExistingDate,
} from '~/components/ui/StockGraphEditor/utils';
import useDateRangePickerDialog from '~/hooks/useDateRangePickerDialog';
import useEffectRef from '~/hooks/useEffectRef';
import { ISO_DATE_FORMAT } from '~/types/date';
import { toDateString } from '~/utils';
import { dateString } from '~/types/graphql';
import {
  ZoomPresetType,
  getPeriodByZoomPreset,
  zoomPresetTypes,
  zoomPresets,
} from './config';

export * from './config';

const defaultEndDate = dayjs().toDate();
const defaultStartDate = defaultEndDate;

const initialXAxisDates = [defaultStartDate, defaultEndDate];

export type StockGraphEditorProps = StockGraphProps & {
  loading?: boolean;
  defaultValue?: {
    zoomPeriod?: Partial<Period>;
  };
  hidePeriod?: boolean;
};

const StockGraphEditor = React.forwardRef<EChartsReact, StockGraphEditorProps>(
  (
    {
      canvasStyle,
      loading,
      defaultValue,
      dataset,
      xAxis,
      yAxis,
      series = [],
      dataZoom,
      hidePeriod,
      onReady,
      onZoom,
      onMouseOver,
    },
    ref
  ) => {
    const paramRef = useEffectRef({
      onReady,
      onZoom,
      onMouseOver,
    });

    const ownRef = useRef<EChartsReact | null>(null);

    const getGraphInstance = useCallback(
      () => ownRef.current?.getEchartsInstance(),
      [ownRef]
    );

    const dateRangePicker = useDateRangePickerDialog();

    const xAxisDates = useMemo(
      () => xAxis?.data.map((v) => new Date(v)) || initialXAxisDates,
      [xAxis?.data]
    );
    const xAxisStartDate = xAxisDates.at(0);
    const xAxisEndDate = xAxisDates.at(-1);

    const [zoomPeriod, setZoomPeriod] = useState<
      Partial<Period> & {
        startInput: Date | undefined;
        endInput: Date | undefined;
        currentPreset: ZoomPresetType | false;
      }
    >(() => ({
      start: xAxisStartDate,
      end: xAxisEndDate,
      startInput: xAxisStartDate,
      endInput: xAxisEndDate,
      currentPreset: '1M',
    }));

    const handleOnZoom: StockGraphProps['onZoom'] = (
      zoomValue,
      $graphInstance
    ) => {
      if (!zoomValue.fromInput) {
        setZoomPeriod({
          start: zoomValue.start,
          end: zoomValue.end,
          startInput: zoomValue.start,
          endInput: zoomValue.end,
          currentPreset: zoomPresetTypes.includes(zoomValue.currentPreset)
            ? zoomValue.currentPreset
            : false,
        });
      }

      paramRef.current.onZoom?.(zoomValue, $graphInstance);
    };

    const handleReady: StockGraphProps['onReady'] = (chart) => {
      let firstValue: Partial<Period> & {
        currentPreset: ZoomPresetType | false;
      };

      if (defaultValue?.zoomPeriod) {
        firstValue = {
          start: xAxisDates.at(0),
          end: xAxisDates.at(-1),
          currentPreset: false,
        };

        const { start, end } = defaultValue.zoomPeriod;
        const startDate = dayjs(start);
        if (startDate.isValid()) {
          firstValue.start = startDate.toDate();
        }

        const endDate = dayjs(end);
        if (endDate.isValid()) {
          firstValue.end = endDate.toDate();
        }
      } else {
        const graphRange = getPeriodByZoomPreset(
          zoomPresetTypes[0],
          xAxisDates
        );
        firstValue = {
          start: graphRange?.withinStart,
          end: graphRange?.withinEnd,
          currentPreset: '1M',
        };
      }

      chart.dispatchAction({
        type: 'dataZoom',
        startValue: dayjs(firstValue.start).format(ISO_DATE_FORMAT),
        endValue: dayjs(firstValue.end).format(ISO_DATE_FORMAT),
        batch: [{ currentPreset: firstValue.currentPreset }],
      });

      paramRef.current.onReady?.(chart);
    };

    const handleClickZoomPreset = (targetValue: ZoomPresetType) => {
      const graphRange = getPeriodByZoomPreset(targetValue, xAxisDates);
      if (!graphRange) return;

      const graphInstance = getGraphInstance();
      graphInstance?.dispatchAction({
        type: 'dataZoom',
        startValue: dayjs(graphRange.withinStart).format(ISO_DATE_FORMAT),
        endValue: dayjs(graphRange.withinEnd).format(ISO_DATE_FORMAT),
        batch: [{ fromInput: true, currentPreset: targetValue }],
      });

      setZoomPeriod({
        start: graphRange.withinStart,
        end: graphRange.withinEnd,
        startInput: graphRange.start,
        endInput: graphRange.end,
        currentPreset: targetValue,
      });
    };

    const changeZoomPeriod = (inputPeriod: Partial<Period>) => {
      const inputStartDate = dayjs(inputPeriod.start);
      const inputEndDate = dayjs(inputPeriod.end);

      if (!inputStartDate.isValid() || !inputEndDate.isValid()) return;

      const graphInstance = getGraphInstance();

      if (!xAxisDates.length) return;
      const xAxisDateValues = xAxisDates.map((v) => dateFormat(v));

      const nextPeriod: {
        startValue?: string;
        endValue?: string;
      } = {
        startValue: undefined,
        endValue: undefined,
      };

      if (inputStartDate.isBefore(xAxisDates.at(0), 'date')) {
        nextPeriod.startValue =
          xAxisDates.at(0) && dateFormat(xAxisDates.at(0));
      } else {
        nextPeriod.startValue = getExistingDate(
          xAxisDateValues,
          dateString(inputStartDate.format(ISO_DATE_FORMAT)),
          1
        );
      }

      if (inputEndDate.isAfter(xAxisDates.at(-1), 'date')) {
        nextPeriod.endValue =
          xAxisDates.at(-1) && dateFormat(xAxisDates.at(-1));
      } else {
        nextPeriod.endValue = getExistingDate(
          xAxisDateValues,
          dateString(inputEndDate.format(ISO_DATE_FORMAT)),
          -1
        );
      }

      setZoomPeriod((prev) => ({
        ...prev,
        startInput: inputPeriod.start,
        endInput: inputPeriod.end,
        currentPreset: false,
      }));

      graphInstance?.dispatchAction({
        type: 'dataZoom',
        startValue: nextPeriod.startValue,
        endValue: nextPeriod.endValue,
        batch: [{ fromInput: true }],
      });
    };

    const handleClickDateRange: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      const graphInstance = getGraphInstance();
      if (!graphInstance) return;

      dateRangePicker.toggle({
        anchorEl: e.currentTarget,
        dateRangeProps: {
          hideDefinedRanges: true,
          initialDateRange: {
            startDate: zoomPeriod.startInput,
            endDate: zoomPeriod.endInput,
          },
          onChange: ({ startDate: start, endDate: end }) =>
            changeZoomPeriod({ start, end }),
        },
      });
    };

    return (
      <Stack
        sx={{
          position: 'relative',
          height: 1,
        }}
      >
        {loading && (
          <LinearProgress
            sx={{
              position: 'absolute',
              width: 1,
              height: 2,
            }}
          />
        )}
        <Stack height={1} p={2}>
          <Row px={2} spacing={1}>
            <Box flex={1} />
            <Tabs
              sx={{
                minHeight: 30,
                height: 30,
              }}
              value={zoomPeriod.currentPreset}
              onChange={(_, v: ZoomPresetType) => handleClickZoomPreset(v)}
            >
              {zoomPresets.map((v) => (
                <Tab
                  key={v.key}
                  sx={{
                    minWidth: 30,
                    minHeight: 30,
                    height: 30,
                    px: 1.5,
                  }}
                  label={v.label}
                  value={v.key}
                />
              ))}
            </Tabs>
            {!hidePeriod && (
              <Button
                sx={{
                  height: 30,
                }}
                startIcon={<CalendarMonthRoundedIcon />}
                onClick={handleClickDateRange}
              >
                {zoomPeriod.startInput
                  ? toDateString(zoomPeriod.startInput)
                  : '開始日'}
                <Box component="span" mx={0.5}>
                  ～
                </Box>
                {zoomPeriod.endInput
                  ? toDateString(zoomPeriod.endInput)
                  : '終了日'}
              </Button>
            )}
          </Row>
          <StockGraph
            ref={mergeRefs([ownRef, ref])}
            canvasStyle={canvasStyle}
            dataset={dataset}
            xAxis={xAxis}
            yAxis={yAxis}
            series={series}
            dataZoom={dataZoom}
            onReady={handleReady}
            onZoom={handleOnZoom}
            onMouseOver={onMouseOver}
          />
        </Stack>
      </Stack>
    );
  }
);
StockGraphEditor.displayName = 'StockGraphEditor';

export default StockGraphEditor;
