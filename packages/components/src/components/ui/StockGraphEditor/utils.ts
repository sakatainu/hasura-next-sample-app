import dayjs, { Dayjs } from 'dayjs';
import { ISO_DATE_FORMAT } from '~/types/date';
import { dateString } from '~/types/graphql';

export const dateFormat = (
  date: string | Date | null | undefined | Dayjs
): DateString => dateString(dayjs(date).format(ISO_DATE_FORMAT));

export const getExistingDate = (
  dateValueSet: DateString[],
  target: DateString,
  direction: 1 | -1,
  deps = 0
): DateString | undefined => {
  if (dateValueSet.includes(target)) return target;
  if (deps < 7) {
    const next = dateFormat(dayjs(target).add(direction, 'd'));
    return getExistingDate(dateValueSet, next, direction, deps + 1);
  }
  return undefined;
};
