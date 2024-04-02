import {
  DesktopDateTimePicker,
  DesktopDateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useRef } from 'react';
import { CustomSyntheticEvent, createSyntheticEvent } from '~/utils';

export type DateTimePickerProps = Omit<
  DesktopDateTimePickerProps<Dayjs>,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: string | Date | null;
  defaultValue?: string | Date | null;
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

const DateTimePicker = ({
  slotProps,
  format,
  defaultValue,
  value,
  onChange,
  ...rest
}: DateTimePickerProps) => {
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

    onChange?.(
      createSyntheticEvent(event, {
        date: date.toDate(),
        inputText: date.format('YYYY-MM-DD HH:mm:ss'),
      })
    );
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
      <DesktopDateTimePicker
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

export default DateTimePicker;
