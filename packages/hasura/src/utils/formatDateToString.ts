import { format } from 'date-fns'

import { assertTimestamptzString } from '#/permission/utils'

// Use dayjs format to flat milliseconds to prevent truncate digits by hasura.
export const formatDateToString = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ssxxx")
  assertTimestamptzString(formattedDate)

  return formattedDate
}
