import {
  assertBrandedString,
  DateString,
  EventTypes_Enum,
  UuidString,
  TimestamptzString,
  TimestampString,
} from '@sample/components/generated/graphql';

export type GroupEventType = `${EventTypes_Enum}`;

export const groupEventTypes = Object.entries(EventTypes_Enum).map(
  ([, v]) => v
);

export const isGroupEventType = (
  value: string | undefined | null
): value is GroupEventType => groupEventTypes.some((v) => v === value);

const typeToEnumMap = Object.fromEntries(
  Object.entries(EventTypes_Enum).map<[GroupEventType, EventTypes_Enum]>(
    ([, v]) => [v, v]
  )
);

export const toGroupEventTypeEnum = (value: GroupEventType): EventTypes_Enum =>
  typeToEnumMap[value];

export const gqlString = <T extends string>(value: string): T => {
  assertBrandedString<T>(value);
  return value;
};

export const uuidString = (value: string): UuidString =>
  gqlString<UuidString>(value);

export const dateString = (value: string): DateString =>
  gqlString<DateString>(value);

export const timestampString = (value: string): TimestampString =>
  gqlString<TimestampString>(value);

export const timestamptzString = (value: string): TimestamptzString =>
  gqlString<TimestamptzString>(value);

export type GroupStockIssueListId = string;
export type GroupListedStockIssueId = string;

/**
 * @deprecated urqlのvariablesがv3->v4.0.6でundefinedを許容しなくなったため暫定（恐らくurql側で修正される）
 */
export const gqlVar = <T>(param?: unknown): T => {
  if (!param) return undefined as unknown as T;
  return param as T;
};
