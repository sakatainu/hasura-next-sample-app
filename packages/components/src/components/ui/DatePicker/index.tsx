import {
  DesktopDatePicker,
  DesktopDatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useRef } from 'react';
import { CustomSyntheticEvent, createSyntheticEvent } from '~/utils';

export type DatePickerProps = Omit<
  DesktopDatePickerProps<Dayjs>,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: string | Date | null;
  defaultValue?: string | Date | null;
  timeSetOf?: 'start' | 'end';
  onChange?: (
    event: CustomSyntheticEvent<
      HTMLInputElement,
      Event,
      { date: Date | null; inputText: string | null }
    >
  ) => void;
};

const getDayjsState = (
  date: string | Date | null | undefined
): Dayjs | undefined => (date ? dayjs(date) : undefined);

const DatePicker = ({
  slotProps,
  format = 'YYYY/MM/DD',
  timeSetOf = 'start',
  defaultValue,
  value,
  onChange,
  ...rest
}: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ownDefaultValue = useMemo(
    () => getDayjsState(defaultValue),
    [defaultValue]
  );

  const ownValue = useMemo(() => getDayjsState(value), [value]);

  const handleOnChangeEventDate = (date: Dayjs | null) => {
    const event = new Event('change');
    if (!date?.isValid()) {
      onChange?.(createSyntheticEvent(event, { date: null, inputText: null }));
      return;
    }

    let fixedDate = date;
    fixedDate = fixedDate[`${timeSetOf}Of`]('date');
    const payload = {
      date: fixedDate.toDate(),
      inputText: fixedDate.format(format),
    };
    onChange?.(createSyntheticEvent(event, payload));
  };

  const handleOnError = (error: unknown) => {
    if (error) {
      inputRef.current?.setCustomValidity('適切な日付を入力してください');
    } else {
      inputRef.current?.setCustomValidity('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={$env.LANG}>
      <DesktopDatePicker
        {...rest}
        slotProps={{
          ...slotProps,
          textField: {
            ...slotProps?.textField,
            inputRef,
          },
        }}
        defaultValue={ownDefaultValue}
        format={format}
        onChange={handleOnChangeEventDate}
        onError={handleOnError}
        inputRef={inputRef}
        value={ownValue}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
