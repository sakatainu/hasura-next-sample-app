import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

type UseDatetimeReturnType = {
  date: string;
  time: string;
  datetime: Date;
  setDate: (newDate: Date) => void;
  setTime: (newTime: string) => void;
};

/**
 * Date型を引数に、日付と時間を分離して管理するhooks
 * 日付や時間ごとの更新に対応。
 */
const useDatetime = (initialValue: Date): UseDatetimeReturnType => {
  const [date, setDate] = useState(dayjs(initialValue).format('YYYYMMDD'));
  const [time, setTime] = useState(dayjs(initialValue).format('HHmm'));
  const [datetime, setDatetime] = useState(initialValue);

  useEffect(() => {
    const newDatetime = dayjs(date + time, 'YYYYMMDDHHmm').toDate();
    setDatetime(newDatetime);
  }, [date, time]);

  return {
    date,
    time,
    datetime,
    setDate: (newDate: Date) => setDate(dayjs(newDate).format('YYYYMMDD')),
    setTime: (newTime: string) =>
      setTime(dayjs(newTime, 'HHmm').format('HHmm')),
  };
};

export default useDatetime;
