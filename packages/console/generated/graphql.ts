import { gql } from 'urql';
import * as Urql from 'urql';

      export const assertBrandedString : <T>(a: unknown) => asserts a is T = (a) => {
        if (typeof a !== 'string') throw new Error(`${a} is not string`);
      }
      
export type DateString = string & { __dateStringBrand: never };
export type TimestampString = string & { __timestampStringBrand: never };
export type TimestamptzString = string & { __timestamptzStringBrand: never };
export type UuidString = string & { __UuidStringBrand: never };

      export const brandedString = <T>(a: unknown): T => {
        assertBrandedString<T>(a);
        return a;
      };
      
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: number; output: number; }
  timestamptz: { input: TimestamptzString; output: TimestamptzString; }
  uuid: { input: UuidString; output: UuidString; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "contracts" */
export type Contracts = {
  __typename?: 'contracts';
  expireAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  group: Groups;
  groupId: Scalars['uuid']['output'];
  maxUsers: Scalars['bigint']['output'];
  /** An object relationship */
  plan: Plans;
  planCode: Scalars['String']['output'];
  startAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "contracts" */
export type Contracts_Aggregate = {
  __typename?: 'contracts_aggregate';
  aggregate?: Maybe<Contracts_Aggregate_Fields>;
  nodes: Array<Contracts>;
};

export type Contracts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contracts_Aggregate_Bool_Exp_Count>;
};

export type Contracts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contracts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contracts" */
export type Contracts_Aggregate_Fields = {
  __typename?: 'contracts_aggregate_fields';
  avg?: Maybe<Contracts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contracts_Max_Fields>;
  min?: Maybe<Contracts_Min_Fields>;
  stddev?: Maybe<Contracts_Stddev_Fields>;
  stddev_pop?: Maybe<Contracts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contracts_Stddev_Samp_Fields>;
  sum?: Maybe<Contracts_Sum_Fields>;
  var_pop?: Maybe<Contracts_Var_Pop_Fields>;
  var_samp?: Maybe<Contracts_Var_Samp_Fields>;
  variance?: Maybe<Contracts_Variance_Fields>;
};


/** aggregate fields of "contracts" */
export type Contracts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contracts" */
export type Contracts_Aggregate_Order_By = {
  avg?: InputMaybe<Contracts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contracts_Max_Order_By>;
  min?: InputMaybe<Contracts_Min_Order_By>;
  stddev?: InputMaybe<Contracts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contracts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contracts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contracts_Sum_Order_By>;
  var_pop?: InputMaybe<Contracts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contracts_Var_Samp_Order_By>;
  variance?: InputMaybe<Contracts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contracts" */
export type Contracts_Arr_Rel_Insert_Input = {
  data: Array<Contracts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};

/** aggregate avg on columns */
export type Contracts_Avg_Fields = {
  __typename?: 'contracts_avg_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contracts" */
export type Contracts_Avg_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contracts". All fields are combined with a logical 'AND'. */
export type Contracts_Bool_Exp = {
  _and?: InputMaybe<Array<Contracts_Bool_Exp>>;
  _not?: InputMaybe<Contracts_Bool_Exp>;
  _or?: InputMaybe<Array<Contracts_Bool_Exp>>;
  expireAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  group?: InputMaybe<Groups_Bool_Exp>;
  groupId?: InputMaybe<Uuid_Comparison_Exp>;
  maxUsers?: InputMaybe<Bigint_Comparison_Exp>;
  plan?: InputMaybe<Plans_Bool_Exp>;
  planCode?: InputMaybe<String_Comparison_Exp>;
  startAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contracts" */
export enum Contracts_Constraint {
  /** unique or primary key constraint on columns "groupId" */
  ContractsPkey = 'contracts_pkey'
}

/** input type for incrementing numeric columns in table "contracts" */
export type Contracts_Inc_Input = {
  maxUsers?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "contracts" */
export type Contracts_Insert_Input = {
  expireAt?: InputMaybe<Scalars['timestamptz']['input']>;
  group?: InputMaybe<Groups_Obj_Rel_Insert_Input>;
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  maxUsers?: InputMaybe<Scalars['bigint']['input']>;
  plan?: InputMaybe<Plans_Obj_Rel_Insert_Input>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contracts_Max_Fields = {
  __typename?: 'contracts_max_fields';
  expireAt?: Maybe<Scalars['timestamptz']['output']>;
  groupId?: Maybe<Scalars['uuid']['output']>;
  maxUsers?: Maybe<Scalars['bigint']['output']>;
  planCode?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "contracts" */
export type Contracts_Max_Order_By = {
  expireAt?: InputMaybe<Order_By>;
  groupId?: InputMaybe<Order_By>;
  maxUsers?: InputMaybe<Order_By>;
  planCode?: InputMaybe<Order_By>;
  startAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contracts_Min_Fields = {
  __typename?: 'contracts_min_fields';
  expireAt?: Maybe<Scalars['timestamptz']['output']>;
  groupId?: Maybe<Scalars['uuid']['output']>;
  maxUsers?: Maybe<Scalars['bigint']['output']>;
  planCode?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "contracts" */
export type Contracts_Min_Order_By = {
  expireAt?: InputMaybe<Order_By>;
  groupId?: InputMaybe<Order_By>;
  maxUsers?: InputMaybe<Order_By>;
  planCode?: InputMaybe<Order_By>;
  startAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contracts" */
export type Contracts_Mutation_Response = {
  __typename?: 'contracts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contracts>;
};

/** input type for inserting object relation for remote table "contracts" */
export type Contracts_Obj_Rel_Insert_Input = {
  data: Contracts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};

/** on_conflict condition type for table "contracts" */
export type Contracts_On_Conflict = {
  constraint: Contracts_Constraint;
  update_columns?: Array<Contracts_Update_Column>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};

/** Ordering options when selecting data from "contracts". */
export type Contracts_Order_By = {
  expireAt?: InputMaybe<Order_By>;
  group?: InputMaybe<Groups_Order_By>;
  groupId?: InputMaybe<Order_By>;
  maxUsers?: InputMaybe<Order_By>;
  plan?: InputMaybe<Plans_Order_By>;
  planCode?: InputMaybe<Order_By>;
  startAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contracts */
export type Contracts_Pk_Columns_Input = {
  groupId: Scalars['uuid']['input'];
};

/** select columns of table "contracts" */
export enum Contracts_Select_Column {
  /** column name */
  ExpireAt = 'expireAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  MaxUsers = 'maxUsers',
  /** column name */
  PlanCode = 'planCode',
  /** column name */
  StartAt = 'startAt'
}

/** input type for updating data in table "contracts" */
export type Contracts_Set_Input = {
  expireAt?: InputMaybe<Scalars['timestamptz']['input']>;
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  maxUsers?: InputMaybe<Scalars['bigint']['input']>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Contracts_Stddev_Fields = {
  __typename?: 'contracts_stddev_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contracts" */
export type Contracts_Stddev_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contracts_Stddev_Pop_Fields = {
  __typename?: 'contracts_stddev_pop_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contracts" */
export type Contracts_Stddev_Pop_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contracts_Stddev_Samp_Fields = {
  __typename?: 'contracts_stddev_samp_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contracts" */
export type Contracts_Stddev_Samp_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "contracts" */
export type Contracts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contracts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contracts_Stream_Cursor_Value_Input = {
  expireAt?: InputMaybe<Scalars['timestamptz']['input']>;
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  maxUsers?: InputMaybe<Scalars['bigint']['input']>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Contracts_Sum_Fields = {
  __typename?: 'contracts_sum_fields';
  maxUsers?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "contracts" */
export type Contracts_Sum_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** update columns of table "contracts" */
export enum Contracts_Update_Column {
  /** column name */
  ExpireAt = 'expireAt',
  /** column name */
  GroupId = 'groupId',
  /** column name */
  MaxUsers = 'maxUsers',
  /** column name */
  PlanCode = 'planCode',
  /** column name */
  StartAt = 'startAt'
}

export type Contracts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Contracts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contracts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contracts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Contracts_Var_Pop_Fields = {
  __typename?: 'contracts_var_pop_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contracts" */
export type Contracts_Var_Pop_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contracts_Var_Samp_Fields = {
  __typename?: 'contracts_var_samp_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contracts" */
export type Contracts_Var_Samp_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contracts_Variance_Fields = {
  __typename?: 'contracts_variance_fields';
  maxUsers?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contracts" */
export type Contracts_Variance_Order_By = {
  maxUsers?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "groupTypeAssignments" */
export type GroupTypeAssignments = {
  __typename?: 'groupTypeAssignments';
  /** An object relationship */
  group: Groups;
  groupId: Scalars['uuid']['output'];
  /** An object relationship */
  groupType: GroupTypes;
  groupTypeCode: Scalars['String']['output'];
};

/** aggregated selection of "groupTypeAssignments" */
export type GroupTypeAssignments_Aggregate = {
  __typename?: 'groupTypeAssignments_aggregate';
  aggregate?: Maybe<GroupTypeAssignments_Aggregate_Fields>;
  nodes: Array<GroupTypeAssignments>;
};

export type GroupTypeAssignments_Aggregate_Bool_Exp = {
  count?: InputMaybe<GroupTypeAssignments_Aggregate_Bool_Exp_Count>;
};

export type GroupTypeAssignments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "groupTypeAssignments" */
export type GroupTypeAssignments_Aggregate_Fields = {
  __typename?: 'groupTypeAssignments_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<GroupTypeAssignments_Max_Fields>;
  min?: Maybe<GroupTypeAssignments_Min_Fields>;
};


/** aggregate fields of "groupTypeAssignments" */
export type GroupTypeAssignments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "groupTypeAssignments" */
export type GroupTypeAssignments_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GroupTypeAssignments_Max_Order_By>;
  min?: InputMaybe<GroupTypeAssignments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "groupTypeAssignments" */
export type GroupTypeAssignments_Arr_Rel_Insert_Input = {
  data: Array<GroupTypeAssignments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GroupTypeAssignments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "groupTypeAssignments". All fields are combined with a logical 'AND'. */
export type GroupTypeAssignments_Bool_Exp = {
  _and?: InputMaybe<Array<GroupTypeAssignments_Bool_Exp>>;
  _not?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
  _or?: InputMaybe<Array<GroupTypeAssignments_Bool_Exp>>;
  group?: InputMaybe<Groups_Bool_Exp>;
  groupId?: InputMaybe<Uuid_Comparison_Exp>;
  groupType?: InputMaybe<GroupTypes_Bool_Exp>;
  groupTypeCode?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "groupTypeAssignments" */
export enum GroupTypeAssignments_Constraint {
  /** unique or primary key constraint on columns "groupId" */
  GroupTypeAssignmentsPkey = 'groupTypeAssignments_pkey'
}

/** input type for inserting data into table "groupTypeAssignments" */
export type GroupTypeAssignments_Insert_Input = {
  group?: InputMaybe<Groups_Obj_Rel_Insert_Input>;
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  groupType?: InputMaybe<GroupTypes_Obj_Rel_Insert_Input>;
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type GroupTypeAssignments_Max_Fields = {
  __typename?: 'groupTypeAssignments_max_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  groupTypeCode?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "groupTypeAssignments" */
export type GroupTypeAssignments_Max_Order_By = {
  groupId?: InputMaybe<Order_By>;
  groupTypeCode?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GroupTypeAssignments_Min_Fields = {
  __typename?: 'groupTypeAssignments_min_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  groupTypeCode?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "groupTypeAssignments" */
export type GroupTypeAssignments_Min_Order_By = {
  groupId?: InputMaybe<Order_By>;
  groupTypeCode?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "groupTypeAssignments" */
export type GroupTypeAssignments_Mutation_Response = {
  __typename?: 'groupTypeAssignments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<GroupTypeAssignments>;
};

/** input type for inserting object relation for remote table "groupTypeAssignments" */
export type GroupTypeAssignments_Obj_Rel_Insert_Input = {
  data: GroupTypeAssignments_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GroupTypeAssignments_On_Conflict>;
};

/** on_conflict condition type for table "groupTypeAssignments" */
export type GroupTypeAssignments_On_Conflict = {
  constraint: GroupTypeAssignments_Constraint;
  update_columns?: Array<GroupTypeAssignments_Update_Column>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};

/** Ordering options when selecting data from "groupTypeAssignments". */
export type GroupTypeAssignments_Order_By = {
  group?: InputMaybe<Groups_Order_By>;
  groupId?: InputMaybe<Order_By>;
  groupType?: InputMaybe<GroupTypes_Order_By>;
  groupTypeCode?: InputMaybe<Order_By>;
};

/** primary key columns input for table: groupTypeAssignments */
export type GroupTypeAssignments_Pk_Columns_Input = {
  groupId: Scalars['uuid']['input'];
};

/** select columns of table "groupTypeAssignments" */
export enum GroupTypeAssignments_Select_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  GroupTypeCode = 'groupTypeCode'
}

/** input type for updating data in table "groupTypeAssignments" */
export type GroupTypeAssignments_Set_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "groupTypeAssignments" */
export type GroupTypeAssignments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GroupTypeAssignments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GroupTypeAssignments_Stream_Cursor_Value_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "groupTypeAssignments" */
export enum GroupTypeAssignments_Update_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  GroupTypeCode = 'groupTypeCode'
}

export type GroupTypeAssignments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<GroupTypeAssignments_Set_Input>;
  /** filter the rows which have to be updated */
  where: GroupTypeAssignments_Bool_Exp;
};

/** columns and relationships of "groupTypeTranslations" */
export type GroupTypeTranslations = {
  __typename?: 'groupTypeTranslations';
  /** An object relationship */
  groupType: GroupTypes;
  groupTypeCode: Scalars['String']['output'];
  /** An object relationship */
  language: Languages;
  languageCode: Languages_Enum;
  text: Scalars['String']['output'];
};

/** aggregated selection of "groupTypeTranslations" */
export type GroupTypeTranslations_Aggregate = {
  __typename?: 'groupTypeTranslations_aggregate';
  aggregate?: Maybe<GroupTypeTranslations_Aggregate_Fields>;
  nodes: Array<GroupTypeTranslations>;
};

export type GroupTypeTranslations_Aggregate_Bool_Exp = {
  count?: InputMaybe<GroupTypeTranslations_Aggregate_Bool_Exp_Count>;
};

export type GroupTypeTranslations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "groupTypeTranslations" */
export type GroupTypeTranslations_Aggregate_Fields = {
  __typename?: 'groupTypeTranslations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<GroupTypeTranslations_Max_Fields>;
  min?: Maybe<GroupTypeTranslations_Min_Fields>;
};


/** aggregate fields of "groupTypeTranslations" */
export type GroupTypeTranslations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "groupTypeTranslations" */
export type GroupTypeTranslations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GroupTypeTranslations_Max_Order_By>;
  min?: InputMaybe<GroupTypeTranslations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "groupTypeTranslations" */
export type GroupTypeTranslations_Arr_Rel_Insert_Input = {
  data: Array<GroupTypeTranslations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GroupTypeTranslations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "groupTypeTranslations". All fields are combined with a logical 'AND'. */
export type GroupTypeTranslations_Bool_Exp = {
  _and?: InputMaybe<Array<GroupTypeTranslations_Bool_Exp>>;
  _not?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
  _or?: InputMaybe<Array<GroupTypeTranslations_Bool_Exp>>;
  groupType?: InputMaybe<GroupTypes_Bool_Exp>;
  groupTypeCode?: InputMaybe<String_Comparison_Exp>;
  language?: InputMaybe<Languages_Bool_Exp>;
  languageCode?: InputMaybe<Languages_Enum_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "groupTypeTranslations" */
export enum GroupTypeTranslations_Constraint {
  /** unique or primary key constraint on columns "groupTypeCode", "languageCode" */
  GroupTypeTranslationsPkey = 'groupTypeTranslations_pkey'
}

/** input type for inserting data into table "groupTypeTranslations" */
export type GroupTypeTranslations_Insert_Input = {
  groupType?: InputMaybe<GroupTypes_Obj_Rel_Insert_Input>;
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Languages_Obj_Rel_Insert_Input>;
  languageCode?: InputMaybe<Languages_Enum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type GroupTypeTranslations_Max_Fields = {
  __typename?: 'groupTypeTranslations_max_fields';
  groupTypeCode?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "groupTypeTranslations" */
export type GroupTypeTranslations_Max_Order_By = {
  groupTypeCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GroupTypeTranslations_Min_Fields = {
  __typename?: 'groupTypeTranslations_min_fields';
  groupTypeCode?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "groupTypeTranslations" */
export type GroupTypeTranslations_Min_Order_By = {
  groupTypeCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "groupTypeTranslations" */
export type GroupTypeTranslations_Mutation_Response = {
  __typename?: 'groupTypeTranslations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<GroupTypeTranslations>;
};

/** on_conflict condition type for table "groupTypeTranslations" */
export type GroupTypeTranslations_On_Conflict = {
  constraint: GroupTypeTranslations_Constraint;
  update_columns?: Array<GroupTypeTranslations_Update_Column>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};

/** Ordering options when selecting data from "groupTypeTranslations". */
export type GroupTypeTranslations_Order_By = {
  groupType?: InputMaybe<GroupTypes_Order_By>;
  groupTypeCode?: InputMaybe<Order_By>;
  language?: InputMaybe<Languages_Order_By>;
  languageCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** primary key columns input for table: groupTypeTranslations */
export type GroupTypeTranslations_Pk_Columns_Input = {
  groupTypeCode: Scalars['String']['input'];
  languageCode: Languages_Enum;
};

/** select columns of table "groupTypeTranslations" */
export enum GroupTypeTranslations_Select_Column {
  /** column name */
  GroupTypeCode = 'groupTypeCode',
  /** column name */
  LanguageCode = 'languageCode',
  /** column name */
  Text = 'text'
}

/** input type for updating data in table "groupTypeTranslations" */
export type GroupTypeTranslations_Set_Input = {
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Languages_Enum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "groupTypeTranslations" */
export type GroupTypeTranslations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GroupTypeTranslations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GroupTypeTranslations_Stream_Cursor_Value_Input = {
  groupTypeCode?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Languages_Enum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "groupTypeTranslations" */
export enum GroupTypeTranslations_Update_Column {
  /** column name */
  GroupTypeCode = 'groupTypeCode',
  /** column name */
  LanguageCode = 'languageCode',
  /** column name */
  Text = 'text'
}

export type GroupTypeTranslations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<GroupTypeTranslations_Set_Input>;
  /** filter the rows which have to be updated */
  where: GroupTypeTranslations_Bool_Exp;
};

/** columns and relationships of "groupTypes" */
export type GroupTypes = {
  __typename?: 'groupTypes';
  code: Scalars['String']['output'];
  /** An array relationship */
  groupTypeAssignments: Array<GroupTypeAssignments>;
  /** An aggregate relationship */
  groupTypeAssignments_aggregate: GroupTypeAssignments_Aggregate;
  /** An array relationship */
  groupTypeTranslations: Array<GroupTypeTranslations>;
  /** An aggregate relationship */
  groupTypeTranslations_aggregate: GroupTypeTranslations_Aggregate;
};


/** columns and relationships of "groupTypes" */
export type GroupTypesGroupTypeAssignmentsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


/** columns and relationships of "groupTypes" */
export type GroupTypesGroupTypeAssignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


/** columns and relationships of "groupTypes" */
export type GroupTypesGroupTypeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


/** columns and relationships of "groupTypes" */
export type GroupTypesGroupTypeTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};

/** aggregated selection of "groupTypes" */
export type GroupTypes_Aggregate = {
  __typename?: 'groupTypes_aggregate';
  aggregate?: Maybe<GroupTypes_Aggregate_Fields>;
  nodes: Array<GroupTypes>;
};

/** aggregate fields of "groupTypes" */
export type GroupTypes_Aggregate_Fields = {
  __typename?: 'groupTypes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<GroupTypes_Max_Fields>;
  min?: Maybe<GroupTypes_Min_Fields>;
};


/** aggregate fields of "groupTypes" */
export type GroupTypes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GroupTypes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "groupTypes". All fields are combined with a logical 'AND'. */
export type GroupTypes_Bool_Exp = {
  _and?: InputMaybe<Array<GroupTypes_Bool_Exp>>;
  _not?: InputMaybe<GroupTypes_Bool_Exp>;
  _or?: InputMaybe<Array<GroupTypes_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  groupTypeAssignments?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
  groupTypeAssignments_aggregate?: InputMaybe<GroupTypeAssignments_Aggregate_Bool_Exp>;
  groupTypeTranslations?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
  groupTypeTranslations_aggregate?: InputMaybe<GroupTypeTranslations_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "groupTypes" */
export enum GroupTypes_Constraint {
  /** unique or primary key constraint on columns "code" */
  GroupTypesPkey = 'groupTypes_pkey'
}

/** input type for inserting data into table "groupTypes" */
export type GroupTypes_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  groupTypeAssignments?: InputMaybe<GroupTypeAssignments_Arr_Rel_Insert_Input>;
  groupTypeTranslations?: InputMaybe<GroupTypeTranslations_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type GroupTypes_Max_Fields = {
  __typename?: 'groupTypes_max_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type GroupTypes_Min_Fields = {
  __typename?: 'groupTypes_min_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "groupTypes" */
export type GroupTypes_Mutation_Response = {
  __typename?: 'groupTypes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<GroupTypes>;
};

/** input type for inserting object relation for remote table "groupTypes" */
export type GroupTypes_Obj_Rel_Insert_Input = {
  data: GroupTypes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GroupTypes_On_Conflict>;
};

/** on_conflict condition type for table "groupTypes" */
export type GroupTypes_On_Conflict = {
  constraint: GroupTypes_Constraint;
  update_columns?: Array<GroupTypes_Update_Column>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};

/** Ordering options when selecting data from "groupTypes". */
export type GroupTypes_Order_By = {
  code?: InputMaybe<Order_By>;
  groupTypeAssignments_aggregate?: InputMaybe<GroupTypeAssignments_Aggregate_Order_By>;
  groupTypeTranslations_aggregate?: InputMaybe<GroupTypeTranslations_Aggregate_Order_By>;
};

/** primary key columns input for table: groupTypes */
export type GroupTypes_Pk_Columns_Input = {
  code: Scalars['String']['input'];
};

/** select columns of table "groupTypes" */
export enum GroupTypes_Select_Column {
  /** column name */
  Code = 'code'
}

/** input type for updating data in table "groupTypes" */
export type GroupTypes_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "groupTypes" */
export type GroupTypes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GroupTypes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GroupTypes_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "groupTypes" */
export enum GroupTypes_Update_Column {
  /** column name */
  Code = 'code'
}

export type GroupTypes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<GroupTypes_Set_Input>;
  /** filter the rows which have to be updated */
  where: GroupTypes_Bool_Exp;
};

/** columns and relationships of "groups" */
export type Groups = {
  __typename?: 'groups';
  /** An object relationship */
  contract?: Maybe<Contracts>;
  /** An object relationship */
  groupTypeAssignment?: Maybe<GroupTypeAssignments>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  memberships_aggregate: Memberships_Aggregate;
  name: Scalars['String']['output'];
};


/** columns and relationships of "groups" */
export type GroupsMembershipsArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


/** columns and relationships of "groups" */
export type GroupsMemberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};

/** aggregated selection of "groups" */
export type Groups_Aggregate = {
  __typename?: 'groups_aggregate';
  aggregate?: Maybe<Groups_Aggregate_Fields>;
  nodes: Array<Groups>;
};

/** aggregate fields of "groups" */
export type Groups_Aggregate_Fields = {
  __typename?: 'groups_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Groups_Max_Fields>;
  min?: Maybe<Groups_Min_Fields>;
};


/** aggregate fields of "groups" */
export type Groups_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Groups_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "groups". All fields are combined with a logical 'AND'. */
export type Groups_Bool_Exp = {
  _and?: InputMaybe<Array<Groups_Bool_Exp>>;
  _not?: InputMaybe<Groups_Bool_Exp>;
  _or?: InputMaybe<Array<Groups_Bool_Exp>>;
  contract?: InputMaybe<Contracts_Bool_Exp>;
  groupTypeAssignment?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  memberships?: InputMaybe<Memberships_Bool_Exp>;
  memberships_aggregate?: InputMaybe<Memberships_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "groups" */
export enum Groups_Constraint {
  /** unique or primary key constraint on columns "id" */
  GroupsPkey = 'groups_pkey'
}

/** input type for inserting data into table "groups" */
export type Groups_Insert_Input = {
  contract?: InputMaybe<Contracts_Obj_Rel_Insert_Input>;
  groupTypeAssignment?: InputMaybe<GroupTypeAssignments_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  memberships?: InputMaybe<Memberships_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Groups_Max_Fields = {
  __typename?: 'groups_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Groups_Min_Fields = {
  __typename?: 'groups_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "groups" */
export type Groups_Mutation_Response = {
  __typename?: 'groups_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Groups>;
};

/** input type for inserting object relation for remote table "groups" */
export type Groups_Obj_Rel_Insert_Input = {
  data: Groups_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Groups_On_Conflict>;
};

/** on_conflict condition type for table "groups" */
export type Groups_On_Conflict = {
  constraint: Groups_Constraint;
  update_columns?: Array<Groups_Update_Column>;
  where?: InputMaybe<Groups_Bool_Exp>;
};

/** Ordering options when selecting data from "groups". */
export type Groups_Order_By = {
  contract?: InputMaybe<Contracts_Order_By>;
  groupTypeAssignment?: InputMaybe<GroupTypeAssignments_Order_By>;
  id?: InputMaybe<Order_By>;
  memberships_aggregate?: InputMaybe<Memberships_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: groups */
export type Groups_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "groups" */
export enum Groups_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "groups" */
export type Groups_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "groups" */
export type Groups_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Groups_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Groups_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "groups" */
export enum Groups_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Groups_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Groups_Set_Input>;
  /** filter the rows which have to be updated */
  where: Groups_Bool_Exp;
};

/** columns and relationships of "languages" */
export type Languages = {
  __typename?: 'languages';
  code: Scalars['String']['output'];
  /** An array relationship */
  groupTypeTranslations: Array<GroupTypeTranslations>;
  /** An aggregate relationship */
  groupTypeTranslations_aggregate: GroupTypeTranslations_Aggregate;
  /** An array relationship */
  planTranslations: Array<PlanTranslations>;
  /** An aggregate relationship */
  planTranslations_aggregate: PlanTranslations_Aggregate;
};


/** columns and relationships of "languages" */
export type LanguagesGroupTypeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


/** columns and relationships of "languages" */
export type LanguagesGroupTypeTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


/** columns and relationships of "languages" */
export type LanguagesPlanTranslationsArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


/** columns and relationships of "languages" */
export type LanguagesPlanTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};

/** aggregated selection of "languages" */
export type Languages_Aggregate = {
  __typename?: 'languages_aggregate';
  aggregate?: Maybe<Languages_Aggregate_Fields>;
  nodes: Array<Languages>;
};

/** aggregate fields of "languages" */
export type Languages_Aggregate_Fields = {
  __typename?: 'languages_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Languages_Max_Fields>;
  min?: Maybe<Languages_Min_Fields>;
};


/** aggregate fields of "languages" */
export type Languages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Languages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "languages". All fields are combined with a logical 'AND'. */
export type Languages_Bool_Exp = {
  _and?: InputMaybe<Array<Languages_Bool_Exp>>;
  _not?: InputMaybe<Languages_Bool_Exp>;
  _or?: InputMaybe<Array<Languages_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  groupTypeTranslations?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
  groupTypeTranslations_aggregate?: InputMaybe<GroupTypeTranslations_Aggregate_Bool_Exp>;
  planTranslations?: InputMaybe<PlanTranslations_Bool_Exp>;
  planTranslations_aggregate?: InputMaybe<PlanTranslations_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "languages" */
export enum Languages_Constraint {
  /** unique or primary key constraint on columns "code" */
  LanguagesCode = 'languages_code'
}

export enum Languages_Enum {
  Ja = 'ja'
}

/** Boolean expression to compare columns of type "languages_enum". All fields are combined with logical 'AND'. */
export type Languages_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Languages_Enum>;
  _in?: InputMaybe<Array<Languages_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Languages_Enum>;
  _nin?: InputMaybe<Array<Languages_Enum>>;
};

/** input type for inserting data into table "languages" */
export type Languages_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  groupTypeTranslations?: InputMaybe<GroupTypeTranslations_Arr_Rel_Insert_Input>;
  planTranslations?: InputMaybe<PlanTranslations_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Languages_Max_Fields = {
  __typename?: 'languages_max_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Languages_Min_Fields = {
  __typename?: 'languages_min_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "languages" */
export type Languages_Mutation_Response = {
  __typename?: 'languages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Languages>;
};

/** input type for inserting object relation for remote table "languages" */
export type Languages_Obj_Rel_Insert_Input = {
  data: Languages_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Languages_On_Conflict>;
};

/** on_conflict condition type for table "languages" */
export type Languages_On_Conflict = {
  constraint: Languages_Constraint;
  update_columns?: Array<Languages_Update_Column>;
  where?: InputMaybe<Languages_Bool_Exp>;
};

/** Ordering options when selecting data from "languages". */
export type Languages_Order_By = {
  code?: InputMaybe<Order_By>;
  groupTypeTranslations_aggregate?: InputMaybe<GroupTypeTranslations_Aggregate_Order_By>;
  planTranslations_aggregate?: InputMaybe<PlanTranslations_Aggregate_Order_By>;
};

/** primary key columns input for table: languages */
export type Languages_Pk_Columns_Input = {
  code: Scalars['String']['input'];
};

/** select columns of table "languages" */
export enum Languages_Select_Column {
  /** column name */
  Code = 'code'
}

/** input type for updating data in table "languages" */
export type Languages_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "languages" */
export type Languages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Languages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Languages_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "languages" */
export enum Languages_Update_Column {
  /** column name */
  Code = 'code'
}

export type Languages_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Languages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Languages_Bool_Exp;
};

/** columns and relationships of "memberships" */
export type Memberships = {
  __typename?: 'memberships';
  /** An object relationship */
  group: Groups;
  groupId: Scalars['uuid']['output'];
  /** An object relationship */
  ownership?: Maybe<Ownerships>;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "memberships" */
export type Memberships_Aggregate = {
  __typename?: 'memberships_aggregate';
  aggregate?: Maybe<Memberships_Aggregate_Fields>;
  nodes: Array<Memberships>;
};

export type Memberships_Aggregate_Bool_Exp = {
  count?: InputMaybe<Memberships_Aggregate_Bool_Exp_Count>;
};

export type Memberships_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Memberships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Memberships_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "memberships" */
export type Memberships_Aggregate_Fields = {
  __typename?: 'memberships_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Memberships_Max_Fields>;
  min?: Maybe<Memberships_Min_Fields>;
};


/** aggregate fields of "memberships" */
export type Memberships_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Memberships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "memberships" */
export type Memberships_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Memberships_Max_Order_By>;
  min?: InputMaybe<Memberships_Min_Order_By>;
};

/** input type for inserting array relation for remote table "memberships" */
export type Memberships_Arr_Rel_Insert_Input = {
  data: Array<Memberships_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Memberships_On_Conflict>;
};

/** Boolean expression to filter rows from the table "memberships". All fields are combined with a logical 'AND'. */
export type Memberships_Bool_Exp = {
  _and?: InputMaybe<Array<Memberships_Bool_Exp>>;
  _not?: InputMaybe<Memberships_Bool_Exp>;
  _or?: InputMaybe<Array<Memberships_Bool_Exp>>;
  group?: InputMaybe<Groups_Bool_Exp>;
  groupId?: InputMaybe<Uuid_Comparison_Exp>;
  ownership?: InputMaybe<Ownerships_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "memberships" */
export enum Memberships_Constraint {
  /** unique or primary key constraint on columns "groupId", "userId" */
  MembershipsPkey = 'memberships_pkey'
}

/** input type for inserting data into table "memberships" */
export type Memberships_Insert_Input = {
  group?: InputMaybe<Groups_Obj_Rel_Insert_Input>;
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  ownership?: InputMaybe<Ownerships_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Memberships_Max_Fields = {
  __typename?: 'memberships_max_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "memberships" */
export type Memberships_Max_Order_By = {
  groupId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Memberships_Min_Fields = {
  __typename?: 'memberships_min_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "memberships" */
export type Memberships_Min_Order_By = {
  groupId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "memberships" */
export type Memberships_Mutation_Response = {
  __typename?: 'memberships_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Memberships>;
};

/** input type for inserting object relation for remote table "memberships" */
export type Memberships_Obj_Rel_Insert_Input = {
  data: Memberships_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Memberships_On_Conflict>;
};

/** on_conflict condition type for table "memberships" */
export type Memberships_On_Conflict = {
  constraint: Memberships_Constraint;
  update_columns?: Array<Memberships_Update_Column>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};

/** Ordering options when selecting data from "memberships". */
export type Memberships_Order_By = {
  group?: InputMaybe<Groups_Order_By>;
  groupId?: InputMaybe<Order_By>;
  ownership?: InputMaybe<Ownerships_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: memberships */
export type Memberships_Pk_Columns_Input = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};

/** select columns of table "memberships" */
export enum Memberships_Select_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "memberships" */
export type Memberships_Set_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "memberships" */
export type Memberships_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Memberships_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Memberships_Stream_Cursor_Value_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "memberships" */
export enum Memberships_Update_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  UserId = 'userId'
}

export type Memberships_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Memberships_Set_Input>;
  /** filter the rows which have to be updated */
  where: Memberships_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "contracts" */
  delete_contracts?: Maybe<Contracts_Mutation_Response>;
  /** delete single row from the table: "contracts" */
  delete_contracts_by_pk?: Maybe<Contracts>;
  /** delete data from the table: "groupTypeAssignments" */
  delete_groupTypeAssignments?: Maybe<GroupTypeAssignments_Mutation_Response>;
  /** delete single row from the table: "groupTypeAssignments" */
  delete_groupTypeAssignments_by_pk?: Maybe<GroupTypeAssignments>;
  /** delete data from the table: "groupTypeTranslations" */
  delete_groupTypeTranslations?: Maybe<GroupTypeTranslations_Mutation_Response>;
  /** delete single row from the table: "groupTypeTranslations" */
  delete_groupTypeTranslations_by_pk?: Maybe<GroupTypeTranslations>;
  /** delete data from the table: "groupTypes" */
  delete_groupTypes?: Maybe<GroupTypes_Mutation_Response>;
  /** delete single row from the table: "groupTypes" */
  delete_groupTypes_by_pk?: Maybe<GroupTypes>;
  /** delete data from the table: "groups" */
  delete_groups?: Maybe<Groups_Mutation_Response>;
  /** delete single row from the table: "groups" */
  delete_groups_by_pk?: Maybe<Groups>;
  /** delete data from the table: "languages" */
  delete_languages?: Maybe<Languages_Mutation_Response>;
  /** delete single row from the table: "languages" */
  delete_languages_by_pk?: Maybe<Languages>;
  /** delete data from the table: "memberships" */
  delete_memberships?: Maybe<Memberships_Mutation_Response>;
  /** delete single row from the table: "memberships" */
  delete_memberships_by_pk?: Maybe<Memberships>;
  /** delete data from the table: "ownerships" */
  delete_ownerships?: Maybe<Ownerships_Mutation_Response>;
  /** delete single row from the table: "ownerships" */
  delete_ownerships_by_pk?: Maybe<Ownerships>;
  /** delete data from the table: "planTranslations" */
  delete_planTranslations?: Maybe<PlanTranslations_Mutation_Response>;
  /** delete single row from the table: "planTranslations" */
  delete_planTranslations_by_pk?: Maybe<PlanTranslations>;
  /** delete data from the table: "plans" */
  delete_plans?: Maybe<Plans_Mutation_Response>;
  /** delete single row from the table: "plans" */
  delete_plans_by_pk?: Maybe<Plans>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "contracts" */
  insert_contracts?: Maybe<Contracts_Mutation_Response>;
  /** insert a single row into the table: "contracts" */
  insert_contracts_one?: Maybe<Contracts>;
  /** insert data into the table: "groupTypeAssignments" */
  insert_groupTypeAssignments?: Maybe<GroupTypeAssignments_Mutation_Response>;
  /** insert a single row into the table: "groupTypeAssignments" */
  insert_groupTypeAssignments_one?: Maybe<GroupTypeAssignments>;
  /** insert data into the table: "groupTypeTranslations" */
  insert_groupTypeTranslations?: Maybe<GroupTypeTranslations_Mutation_Response>;
  /** insert a single row into the table: "groupTypeTranslations" */
  insert_groupTypeTranslations_one?: Maybe<GroupTypeTranslations>;
  /** insert data into the table: "groupTypes" */
  insert_groupTypes?: Maybe<GroupTypes_Mutation_Response>;
  /** insert a single row into the table: "groupTypes" */
  insert_groupTypes_one?: Maybe<GroupTypes>;
  /** insert data into the table: "groups" */
  insert_groups?: Maybe<Groups_Mutation_Response>;
  /** insert a single row into the table: "groups" */
  insert_groups_one?: Maybe<Groups>;
  /** insert data into the table: "languages" */
  insert_languages?: Maybe<Languages_Mutation_Response>;
  /** insert a single row into the table: "languages" */
  insert_languages_one?: Maybe<Languages>;
  /** insert data into the table: "memberships" */
  insert_memberships?: Maybe<Memberships_Mutation_Response>;
  /** insert a single row into the table: "memberships" */
  insert_memberships_one?: Maybe<Memberships>;
  /** insert data into the table: "ownerships" */
  insert_ownerships?: Maybe<Ownerships_Mutation_Response>;
  /** insert a single row into the table: "ownerships" */
  insert_ownerships_one?: Maybe<Ownerships>;
  /** insert data into the table: "planTranslations" */
  insert_planTranslations?: Maybe<PlanTranslations_Mutation_Response>;
  /** insert a single row into the table: "planTranslations" */
  insert_planTranslations_one?: Maybe<PlanTranslations>;
  /** insert data into the table: "plans" */
  insert_plans?: Maybe<Plans_Mutation_Response>;
  /** insert a single row into the table: "plans" */
  insert_plans_one?: Maybe<Plans>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "contracts" */
  update_contracts?: Maybe<Contracts_Mutation_Response>;
  /** update single row of the table: "contracts" */
  update_contracts_by_pk?: Maybe<Contracts>;
  /** update multiples rows of table: "contracts" */
  update_contracts_many?: Maybe<Array<Maybe<Contracts_Mutation_Response>>>;
  /** update data of the table: "groupTypeAssignments" */
  update_groupTypeAssignments?: Maybe<GroupTypeAssignments_Mutation_Response>;
  /** update single row of the table: "groupTypeAssignments" */
  update_groupTypeAssignments_by_pk?: Maybe<GroupTypeAssignments>;
  /** update multiples rows of table: "groupTypeAssignments" */
  update_groupTypeAssignments_many?: Maybe<Array<Maybe<GroupTypeAssignments_Mutation_Response>>>;
  /** update data of the table: "groupTypeTranslations" */
  update_groupTypeTranslations?: Maybe<GroupTypeTranslations_Mutation_Response>;
  /** update single row of the table: "groupTypeTranslations" */
  update_groupTypeTranslations_by_pk?: Maybe<GroupTypeTranslations>;
  /** update multiples rows of table: "groupTypeTranslations" */
  update_groupTypeTranslations_many?: Maybe<Array<Maybe<GroupTypeTranslations_Mutation_Response>>>;
  /** update data of the table: "groupTypes" */
  update_groupTypes?: Maybe<GroupTypes_Mutation_Response>;
  /** update single row of the table: "groupTypes" */
  update_groupTypes_by_pk?: Maybe<GroupTypes>;
  /** update multiples rows of table: "groupTypes" */
  update_groupTypes_many?: Maybe<Array<Maybe<GroupTypes_Mutation_Response>>>;
  /** update data of the table: "groups" */
  update_groups?: Maybe<Groups_Mutation_Response>;
  /** update single row of the table: "groups" */
  update_groups_by_pk?: Maybe<Groups>;
  /** update multiples rows of table: "groups" */
  update_groups_many?: Maybe<Array<Maybe<Groups_Mutation_Response>>>;
  /** update data of the table: "languages" */
  update_languages?: Maybe<Languages_Mutation_Response>;
  /** update single row of the table: "languages" */
  update_languages_by_pk?: Maybe<Languages>;
  /** update multiples rows of table: "languages" */
  update_languages_many?: Maybe<Array<Maybe<Languages_Mutation_Response>>>;
  /** update data of the table: "memberships" */
  update_memberships?: Maybe<Memberships_Mutation_Response>;
  /** update single row of the table: "memberships" */
  update_memberships_by_pk?: Maybe<Memberships>;
  /** update multiples rows of table: "memberships" */
  update_memberships_many?: Maybe<Array<Maybe<Memberships_Mutation_Response>>>;
  /** update data of the table: "ownerships" */
  update_ownerships?: Maybe<Ownerships_Mutation_Response>;
  /** update single row of the table: "ownerships" */
  update_ownerships_by_pk?: Maybe<Ownerships>;
  /** update multiples rows of table: "ownerships" */
  update_ownerships_many?: Maybe<Array<Maybe<Ownerships_Mutation_Response>>>;
  /** update data of the table: "planTranslations" */
  update_planTranslations?: Maybe<PlanTranslations_Mutation_Response>;
  /** update single row of the table: "planTranslations" */
  update_planTranslations_by_pk?: Maybe<PlanTranslations>;
  /** update multiples rows of table: "planTranslations" */
  update_planTranslations_many?: Maybe<Array<Maybe<PlanTranslations_Mutation_Response>>>;
  /** update data of the table: "plans" */
  update_plans?: Maybe<Plans_Mutation_Response>;
  /** update single row of the table: "plans" */
  update_plans_by_pk?: Maybe<Plans>;
  /** update multiples rows of table: "plans" */
  update_plans_many?: Maybe<Array<Maybe<Plans_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ContractsArgs = {
  where: Contracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contracts_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_GroupTypeAssignmentsArgs = {
  where: GroupTypeAssignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GroupTypeAssignments_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_GroupTypeTranslationsArgs = {
  where: GroupTypeTranslations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GroupTypeTranslations_By_PkArgs = {
  groupTypeCode: Scalars['String']['input'];
  languageCode: Languages_Enum;
};


/** mutation root */
export type Mutation_RootDelete_GroupTypesArgs = {
  where: GroupTypes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GroupTypes_By_PkArgs = {
  code: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_GroupsArgs = {
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Groups_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_LanguagesArgs = {
  where: Languages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Languages_By_PkArgs = {
  code: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MembershipsArgs = {
  where: Memberships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Memberships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OwnershipsArgs = {
  where: Ownerships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ownerships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PlanTranslationsArgs = {
  where: PlanTranslations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_PlanTranslations_By_PkArgs = {
  languageCode: Languages_Enum;
  planCode: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PlansArgs = {
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plans_By_PkArgs = {
  code: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_ContractsArgs = {
  objects: Array<Contracts_Insert_Input>;
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contracts_OneArgs = {
  object: Contracts_Insert_Input;
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypeAssignmentsArgs = {
  objects: Array<GroupTypeAssignments_Insert_Input>;
  on_conflict?: InputMaybe<GroupTypeAssignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypeAssignments_OneArgs = {
  object: GroupTypeAssignments_Insert_Input;
  on_conflict?: InputMaybe<GroupTypeAssignments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypeTranslationsArgs = {
  objects: Array<GroupTypeTranslations_Insert_Input>;
  on_conflict?: InputMaybe<GroupTypeTranslations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypeTranslations_OneArgs = {
  object: GroupTypeTranslations_Insert_Input;
  on_conflict?: InputMaybe<GroupTypeTranslations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypesArgs = {
  objects: Array<GroupTypes_Insert_Input>;
  on_conflict?: InputMaybe<GroupTypes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupTypes_OneArgs = {
  object: GroupTypes_Insert_Input;
  on_conflict?: InputMaybe<GroupTypes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupsArgs = {
  objects: Array<Groups_Insert_Input>;
  on_conflict?: InputMaybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Groups_OneArgs = {
  object: Groups_Insert_Input;
  on_conflict?: InputMaybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LanguagesArgs = {
  objects: Array<Languages_Insert_Input>;
  on_conflict?: InputMaybe<Languages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Languages_OneArgs = {
  object: Languages_Insert_Input;
  on_conflict?: InputMaybe<Languages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MembershipsArgs = {
  objects: Array<Memberships_Insert_Input>;
  on_conflict?: InputMaybe<Memberships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Memberships_OneArgs = {
  object: Memberships_Insert_Input;
  on_conflict?: InputMaybe<Memberships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OwnershipsArgs = {
  objects: Array<Ownerships_Insert_Input>;
  on_conflict?: InputMaybe<Ownerships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ownerships_OneArgs = {
  object: Ownerships_Insert_Input;
  on_conflict?: InputMaybe<Ownerships_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlanTranslationsArgs = {
  objects: Array<PlanTranslations_Insert_Input>;
  on_conflict?: InputMaybe<PlanTranslations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlanTranslations_OneArgs = {
  object: PlanTranslations_Insert_Input;
  on_conflict?: InputMaybe<PlanTranslations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlansArgs = {
  objects: Array<Plans_Insert_Input>;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plans_OneArgs = {
  object: Plans_Insert_Input;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ContractsArgs = {
  _inc?: InputMaybe<Contracts_Inc_Input>;
  _set?: InputMaybe<Contracts_Set_Input>;
  where: Contracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contracts_By_PkArgs = {
  _inc?: InputMaybe<Contracts_Inc_Input>;
  _set?: InputMaybe<Contracts_Set_Input>;
  pk_columns: Contracts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contracts_ManyArgs = {
  updates: Array<Contracts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeAssignmentsArgs = {
  _set?: InputMaybe<GroupTypeAssignments_Set_Input>;
  where: GroupTypeAssignments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeAssignments_By_PkArgs = {
  _set?: InputMaybe<GroupTypeAssignments_Set_Input>;
  pk_columns: GroupTypeAssignments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeAssignments_ManyArgs = {
  updates: Array<GroupTypeAssignments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeTranslationsArgs = {
  _set?: InputMaybe<GroupTypeTranslations_Set_Input>;
  where: GroupTypeTranslations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeTranslations_By_PkArgs = {
  _set?: InputMaybe<GroupTypeTranslations_Set_Input>;
  pk_columns: GroupTypeTranslations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypeTranslations_ManyArgs = {
  updates: Array<GroupTypeTranslations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypesArgs = {
  _set?: InputMaybe<GroupTypes_Set_Input>;
  where: GroupTypes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypes_By_PkArgs = {
  _set?: InputMaybe<GroupTypes_Set_Input>;
  pk_columns: GroupTypes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GroupTypes_ManyArgs = {
  updates: Array<GroupTypes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GroupsArgs = {
  _set?: InputMaybe<Groups_Set_Input>;
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Groups_By_PkArgs = {
  _set?: InputMaybe<Groups_Set_Input>;
  pk_columns: Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Groups_ManyArgs = {
  updates: Array<Groups_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_LanguagesArgs = {
  _set?: InputMaybe<Languages_Set_Input>;
  where: Languages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Languages_By_PkArgs = {
  _set?: InputMaybe<Languages_Set_Input>;
  pk_columns: Languages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Languages_ManyArgs = {
  updates: Array<Languages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MembershipsArgs = {
  _set?: InputMaybe<Memberships_Set_Input>;
  where: Memberships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Memberships_By_PkArgs = {
  _set?: InputMaybe<Memberships_Set_Input>;
  pk_columns: Memberships_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Memberships_ManyArgs = {
  updates: Array<Memberships_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OwnershipsArgs = {
  _set?: InputMaybe<Ownerships_Set_Input>;
  where: Ownerships_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ownerships_By_PkArgs = {
  _set?: InputMaybe<Ownerships_Set_Input>;
  pk_columns: Ownerships_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ownerships_ManyArgs = {
  updates: Array<Ownerships_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PlanTranslationsArgs = {
  _set?: InputMaybe<PlanTranslations_Set_Input>;
  where: PlanTranslations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_PlanTranslations_By_PkArgs = {
  _set?: InputMaybe<PlanTranslations_Set_Input>;
  pk_columns: PlanTranslations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PlanTranslations_ManyArgs = {
  updates: Array<PlanTranslations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PlansArgs = {
  _set?: InputMaybe<Plans_Set_Input>;
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_By_PkArgs = {
  _set?: InputMaybe<Plans_Set_Input>;
  pk_columns: Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_ManyArgs = {
  updates: Array<Plans_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "ownerships" */
export type Ownerships = {
  __typename?: 'ownerships';
  groupId: Scalars['uuid']['output'];
  /** An object relationship */
  membership?: Maybe<Memberships>;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "ownerships" */
export type Ownerships_Aggregate = {
  __typename?: 'ownerships_aggregate';
  aggregate?: Maybe<Ownerships_Aggregate_Fields>;
  nodes: Array<Ownerships>;
};

/** aggregate fields of "ownerships" */
export type Ownerships_Aggregate_Fields = {
  __typename?: 'ownerships_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Ownerships_Max_Fields>;
  min?: Maybe<Ownerships_Min_Fields>;
};


/** aggregate fields of "ownerships" */
export type Ownerships_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ownerships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ownerships". All fields are combined with a logical 'AND'. */
export type Ownerships_Bool_Exp = {
  _and?: InputMaybe<Array<Ownerships_Bool_Exp>>;
  _not?: InputMaybe<Ownerships_Bool_Exp>;
  _or?: InputMaybe<Array<Ownerships_Bool_Exp>>;
  groupId?: InputMaybe<Uuid_Comparison_Exp>;
  membership?: InputMaybe<Memberships_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ownerships" */
export enum Ownerships_Constraint {
  /** unique or primary key constraint on columns "groupId", "userId" */
  OwnershipsPkey = 'ownerships_pkey'
}

/** input type for inserting data into table "ownerships" */
export type Ownerships_Insert_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  membership?: InputMaybe<Memberships_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Ownerships_Max_Fields = {
  __typename?: 'ownerships_max_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Ownerships_Min_Fields = {
  __typename?: 'ownerships_min_fields';
  groupId?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "ownerships" */
export type Ownerships_Mutation_Response = {
  __typename?: 'ownerships_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ownerships>;
};

/** input type for inserting object relation for remote table "ownerships" */
export type Ownerships_Obj_Rel_Insert_Input = {
  data: Ownerships_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ownerships_On_Conflict>;
};

/** on_conflict condition type for table "ownerships" */
export type Ownerships_On_Conflict = {
  constraint: Ownerships_Constraint;
  update_columns?: Array<Ownerships_Update_Column>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};

/** Ordering options when selecting data from "ownerships". */
export type Ownerships_Order_By = {
  groupId?: InputMaybe<Order_By>;
  membership?: InputMaybe<Memberships_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ownerships */
export type Ownerships_Pk_Columns_Input = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};

/** select columns of table "ownerships" */
export enum Ownerships_Select_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "ownerships" */
export type Ownerships_Set_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ownerships" */
export type Ownerships_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ownerships_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ownerships_Stream_Cursor_Value_Input = {
  groupId?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "ownerships" */
export enum Ownerships_Update_Column {
  /** column name */
  GroupId = 'groupId',
  /** column name */
  UserId = 'userId'
}

export type Ownerships_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ownerships_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ownerships_Bool_Exp;
};

/** columns and relationships of "planTranslations" */
export type PlanTranslations = {
  __typename?: 'planTranslations';
  /** An object relationship */
  language: Languages;
  languageCode: Languages_Enum;
  /** An object relationship */
  plan: Plans;
  planCode: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** aggregated selection of "planTranslations" */
export type PlanTranslations_Aggregate = {
  __typename?: 'planTranslations_aggregate';
  aggregate?: Maybe<PlanTranslations_Aggregate_Fields>;
  nodes: Array<PlanTranslations>;
};

export type PlanTranslations_Aggregate_Bool_Exp = {
  count?: InputMaybe<PlanTranslations_Aggregate_Bool_Exp_Count>;
};

export type PlanTranslations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<PlanTranslations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "planTranslations" */
export type PlanTranslations_Aggregate_Fields = {
  __typename?: 'planTranslations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<PlanTranslations_Max_Fields>;
  min?: Maybe<PlanTranslations_Min_Fields>;
};


/** aggregate fields of "planTranslations" */
export type PlanTranslations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "planTranslations" */
export type PlanTranslations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<PlanTranslations_Max_Order_By>;
  min?: InputMaybe<PlanTranslations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "planTranslations" */
export type PlanTranslations_Arr_Rel_Insert_Input = {
  data: Array<PlanTranslations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<PlanTranslations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "planTranslations". All fields are combined with a logical 'AND'. */
export type PlanTranslations_Bool_Exp = {
  _and?: InputMaybe<Array<PlanTranslations_Bool_Exp>>;
  _not?: InputMaybe<PlanTranslations_Bool_Exp>;
  _or?: InputMaybe<Array<PlanTranslations_Bool_Exp>>;
  language?: InputMaybe<Languages_Bool_Exp>;
  languageCode?: InputMaybe<Languages_Enum_Comparison_Exp>;
  plan?: InputMaybe<Plans_Bool_Exp>;
  planCode?: InputMaybe<String_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "planTranslations" */
export enum PlanTranslations_Constraint {
  /** unique or primary key constraint on columns "planCode", "languageCode" */
  PlanTranslationsPkey = 'planTranslations_pkey'
}

/** input type for inserting data into table "planTranslations" */
export type PlanTranslations_Insert_Input = {
  language?: InputMaybe<Languages_Obj_Rel_Insert_Input>;
  languageCode?: InputMaybe<Languages_Enum>;
  plan?: InputMaybe<Plans_Obj_Rel_Insert_Input>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type PlanTranslations_Max_Fields = {
  __typename?: 'planTranslations_max_fields';
  planCode?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "planTranslations" */
export type PlanTranslations_Max_Order_By = {
  planCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type PlanTranslations_Min_Fields = {
  __typename?: 'planTranslations_min_fields';
  planCode?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "planTranslations" */
export type PlanTranslations_Min_Order_By = {
  planCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "planTranslations" */
export type PlanTranslations_Mutation_Response = {
  __typename?: 'planTranslations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<PlanTranslations>;
};

/** on_conflict condition type for table "planTranslations" */
export type PlanTranslations_On_Conflict = {
  constraint: PlanTranslations_Constraint;
  update_columns?: Array<PlanTranslations_Update_Column>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};

/** Ordering options when selecting data from "planTranslations". */
export type PlanTranslations_Order_By = {
  language?: InputMaybe<Languages_Order_By>;
  languageCode?: InputMaybe<Order_By>;
  plan?: InputMaybe<Plans_Order_By>;
  planCode?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
};

/** primary key columns input for table: planTranslations */
export type PlanTranslations_Pk_Columns_Input = {
  languageCode: Languages_Enum;
  planCode: Scalars['String']['input'];
};

/** select columns of table "planTranslations" */
export enum PlanTranslations_Select_Column {
  /** column name */
  LanguageCode = 'languageCode',
  /** column name */
  PlanCode = 'planCode',
  /** column name */
  Text = 'text'
}

/** input type for updating data in table "planTranslations" */
export type PlanTranslations_Set_Input = {
  languageCode?: InputMaybe<Languages_Enum>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "planTranslations" */
export type PlanTranslations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: PlanTranslations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type PlanTranslations_Stream_Cursor_Value_Input = {
  languageCode?: InputMaybe<Languages_Enum>;
  planCode?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "planTranslations" */
export enum PlanTranslations_Update_Column {
  /** column name */
  LanguageCode = 'languageCode',
  /** column name */
  PlanCode = 'planCode',
  /** column name */
  Text = 'text'
}

export type PlanTranslations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PlanTranslations_Set_Input>;
  /** filter the rows which have to be updated */
  where: PlanTranslations_Bool_Exp;
};

/** columns and relationships of "plans" */
export type Plans = {
  __typename?: 'plans';
  code: Scalars['String']['output'];
  /** An array relationship */
  contracts: Array<Contracts>;
  /** An aggregate relationship */
  contracts_aggregate: Contracts_Aggregate;
  /** An array relationship */
  planTranslations: Array<PlanTranslations>;
  /** An aggregate relationship */
  planTranslations_aggregate: PlanTranslations_Aggregate;
};


/** columns and relationships of "plans" */
export type PlansContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansPlanTranslationsArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansPlanTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};

/** aggregated selection of "plans" */
export type Plans_Aggregate = {
  __typename?: 'plans_aggregate';
  aggregate?: Maybe<Plans_Aggregate_Fields>;
  nodes: Array<Plans>;
};

/** aggregate fields of "plans" */
export type Plans_Aggregate_Fields = {
  __typename?: 'plans_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Plans_Max_Fields>;
  min?: Maybe<Plans_Min_Fields>;
};


/** aggregate fields of "plans" */
export type Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "plans". All fields are combined with a logical 'AND'. */
export type Plans_Bool_Exp = {
  _and?: InputMaybe<Array<Plans_Bool_Exp>>;
  _not?: InputMaybe<Plans_Bool_Exp>;
  _or?: InputMaybe<Array<Plans_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  contracts?: InputMaybe<Contracts_Bool_Exp>;
  contracts_aggregate?: InputMaybe<Contracts_Aggregate_Bool_Exp>;
  planTranslations?: InputMaybe<PlanTranslations_Bool_Exp>;
  planTranslations_aggregate?: InputMaybe<PlanTranslations_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "plans" */
export enum Plans_Constraint {
  /** unique or primary key constraint on columns "code" */
  PlansPkey = 'plans_pkey'
}

/** input type for inserting data into table "plans" */
export type Plans_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  contracts?: InputMaybe<Contracts_Arr_Rel_Insert_Input>;
  planTranslations?: InputMaybe<PlanTranslations_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Plans_Max_Fields = {
  __typename?: 'plans_max_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Plans_Min_Fields = {
  __typename?: 'plans_min_fields';
  code?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "plans" */
export type Plans_Mutation_Response = {
  __typename?: 'plans_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Plans>;
};

/** input type for inserting object relation for remote table "plans" */
export type Plans_Obj_Rel_Insert_Input = {
  data: Plans_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};

/** on_conflict condition type for table "plans" */
export type Plans_On_Conflict = {
  constraint: Plans_Constraint;
  update_columns?: Array<Plans_Update_Column>;
  where?: InputMaybe<Plans_Bool_Exp>;
};

/** Ordering options when selecting data from "plans". */
export type Plans_Order_By = {
  code?: InputMaybe<Order_By>;
  contracts_aggregate?: InputMaybe<Contracts_Aggregate_Order_By>;
  planTranslations_aggregate?: InputMaybe<PlanTranslations_Aggregate_Order_By>;
};

/** primary key columns input for table: plans */
export type Plans_Pk_Columns_Input = {
  code: Scalars['String']['input'];
};

/** select columns of table "plans" */
export enum Plans_Select_Column {
  /** column name */
  Code = 'code'
}

/** input type for updating data in table "plans" */
export type Plans_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "plans" */
export type Plans_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Plans_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Plans_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "plans" */
export enum Plans_Update_Column {
  /** column name */
  Code = 'code'
}

export type Plans_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Plans_Set_Input>;
  /** filter the rows which have to be updated */
  where: Plans_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  contracts: Array<Contracts>;
  /** An aggregate relationship */
  contracts_aggregate: Contracts_Aggregate;
  /** fetch data from the table: "contracts" using primary key columns */
  contracts_by_pk?: Maybe<Contracts>;
  /** An array relationship */
  groupTypeAssignments: Array<GroupTypeAssignments>;
  /** An aggregate relationship */
  groupTypeAssignments_aggregate: GroupTypeAssignments_Aggregate;
  /** fetch data from the table: "groupTypeAssignments" using primary key columns */
  groupTypeAssignments_by_pk?: Maybe<GroupTypeAssignments>;
  /** An array relationship */
  groupTypeTranslations: Array<GroupTypeTranslations>;
  /** An aggregate relationship */
  groupTypeTranslations_aggregate: GroupTypeTranslations_Aggregate;
  /** fetch data from the table: "groupTypeTranslations" using primary key columns */
  groupTypeTranslations_by_pk?: Maybe<GroupTypeTranslations>;
  /** fetch data from the table: "groupTypes" */
  groupTypes: Array<GroupTypes>;
  /** fetch aggregated fields from the table: "groupTypes" */
  groupTypes_aggregate: GroupTypes_Aggregate;
  /** fetch data from the table: "groupTypes" using primary key columns */
  groupTypes_by_pk?: Maybe<GroupTypes>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table: "languages" */
  languages: Array<Languages>;
  /** fetch aggregated fields from the table: "languages" */
  languages_aggregate: Languages_Aggregate;
  /** fetch data from the table: "languages" using primary key columns */
  languages_by_pk?: Maybe<Languages>;
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  memberships_aggregate: Memberships_Aggregate;
  /** fetch data from the table: "memberships" using primary key columns */
  memberships_by_pk?: Maybe<Memberships>;
  /** fetch data from the table: "ownerships" */
  ownerships: Array<Ownerships>;
  /** fetch aggregated fields from the table: "ownerships" */
  ownerships_aggregate: Ownerships_Aggregate;
  /** fetch data from the table: "ownerships" using primary key columns */
  ownerships_by_pk?: Maybe<Ownerships>;
  /** An array relationship */
  planTranslations: Array<PlanTranslations>;
  /** An aggregate relationship */
  planTranslations_aggregate: PlanTranslations_Aggregate;
  /** fetch data from the table: "planTranslations" using primary key columns */
  planTranslations_by_pk?: Maybe<PlanTranslations>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Query_RootContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Query_RootContracts_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


export type Query_RootGroupTypeAssignmentsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


export type Query_RootGroupTypeAssignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


export type Query_RootGroupTypeAssignments_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


export type Query_RootGroupTypeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


export type Query_RootGroupTypeTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


export type Query_RootGroupTypeTranslations_By_PkArgs = {
  groupTypeCode: Scalars['String']['input'];
  languageCode: Languages_Enum;
};


export type Query_RootGroupTypesArgs = {
  distinct_on?: InputMaybe<Array<GroupTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypes_Order_By>>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};


export type Query_RootGroupTypes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypes_Order_By>>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};


export type Query_RootGroupTypes_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Query_RootGroupsArgs = {
  distinct_on?: InputMaybe<Array<Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Groups_Order_By>>;
  where?: InputMaybe<Groups_Bool_Exp>;
};


export type Query_RootGroups_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Groups_Order_By>>;
  where?: InputMaybe<Groups_Bool_Exp>;
};


export type Query_RootGroups_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLanguagesArgs = {
  distinct_on?: InputMaybe<Array<Languages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Languages_Order_By>>;
  where?: InputMaybe<Languages_Bool_Exp>;
};


export type Query_RootLanguages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Languages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Languages_Order_By>>;
  where?: InputMaybe<Languages_Bool_Exp>;
};


export type Query_RootLanguages_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Query_RootMembershipsArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


export type Query_RootMemberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


export type Query_RootMemberships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Query_RootOwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ownerships_Order_By>>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};


export type Query_RootOwnerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ownerships_Order_By>>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};


export type Query_RootOwnerships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Query_RootPlanTranslationsArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


export type Query_RootPlanTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


export type Query_RootPlanTranslations_By_PkArgs = {
  languageCode: Languages_Enum;
  planCode: Scalars['String']['input'];
};


export type Query_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Query_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Query_RootPlans_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  contracts: Array<Contracts>;
  /** An aggregate relationship */
  contracts_aggregate: Contracts_Aggregate;
  /** fetch data from the table: "contracts" using primary key columns */
  contracts_by_pk?: Maybe<Contracts>;
  /** fetch data from the table in a streaming manner: "contracts" */
  contracts_stream: Array<Contracts>;
  /** An array relationship */
  groupTypeAssignments: Array<GroupTypeAssignments>;
  /** An aggregate relationship */
  groupTypeAssignments_aggregate: GroupTypeAssignments_Aggregate;
  /** fetch data from the table: "groupTypeAssignments" using primary key columns */
  groupTypeAssignments_by_pk?: Maybe<GroupTypeAssignments>;
  /** fetch data from the table in a streaming manner: "groupTypeAssignments" */
  groupTypeAssignments_stream: Array<GroupTypeAssignments>;
  /** An array relationship */
  groupTypeTranslations: Array<GroupTypeTranslations>;
  /** An aggregate relationship */
  groupTypeTranslations_aggregate: GroupTypeTranslations_Aggregate;
  /** fetch data from the table: "groupTypeTranslations" using primary key columns */
  groupTypeTranslations_by_pk?: Maybe<GroupTypeTranslations>;
  /** fetch data from the table in a streaming manner: "groupTypeTranslations" */
  groupTypeTranslations_stream: Array<GroupTypeTranslations>;
  /** fetch data from the table: "groupTypes" */
  groupTypes: Array<GroupTypes>;
  /** fetch aggregated fields from the table: "groupTypes" */
  groupTypes_aggregate: GroupTypes_Aggregate;
  /** fetch data from the table: "groupTypes" using primary key columns */
  groupTypes_by_pk?: Maybe<GroupTypes>;
  /** fetch data from the table in a streaming manner: "groupTypes" */
  groupTypes_stream: Array<GroupTypes>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table in a streaming manner: "groups" */
  groups_stream: Array<Groups>;
  /** fetch data from the table: "languages" */
  languages: Array<Languages>;
  /** fetch aggregated fields from the table: "languages" */
  languages_aggregate: Languages_Aggregate;
  /** fetch data from the table: "languages" using primary key columns */
  languages_by_pk?: Maybe<Languages>;
  /** fetch data from the table in a streaming manner: "languages" */
  languages_stream: Array<Languages>;
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  memberships_aggregate: Memberships_Aggregate;
  /** fetch data from the table: "memberships" using primary key columns */
  memberships_by_pk?: Maybe<Memberships>;
  /** fetch data from the table in a streaming manner: "memberships" */
  memberships_stream: Array<Memberships>;
  /** fetch data from the table: "ownerships" */
  ownerships: Array<Ownerships>;
  /** fetch aggregated fields from the table: "ownerships" */
  ownerships_aggregate: Ownerships_Aggregate;
  /** fetch data from the table: "ownerships" using primary key columns */
  ownerships_by_pk?: Maybe<Ownerships>;
  /** fetch data from the table in a streaming manner: "ownerships" */
  ownerships_stream: Array<Ownerships>;
  /** An array relationship */
  planTranslations: Array<PlanTranslations>;
  /** An aggregate relationship */
  planTranslations_aggregate: PlanTranslations_Aggregate;
  /** fetch data from the table: "planTranslations" using primary key columns */
  planTranslations_by_pk?: Maybe<PlanTranslations>;
  /** fetch data from the table in a streaming manner: "planTranslations" */
  planTranslations_stream: Array<PlanTranslations>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table in a streaming manner: "plans" */
  plans_stream: Array<Plans>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootContracts_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


export type Subscription_RootContracts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contracts_Stream_Cursor_Input>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootGroupTypeAssignmentsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


export type Subscription_RootGroupTypeAssignments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeAssignments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeAssignments_Order_By>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


export type Subscription_RootGroupTypeAssignments_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
};


export type Subscription_RootGroupTypeAssignments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GroupTypeAssignments_Stream_Cursor_Input>>;
  where?: InputMaybe<GroupTypeAssignments_Bool_Exp>;
};


export type Subscription_RootGroupTypeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


export type Subscription_RootGroupTypeTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypeTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypeTranslations_Order_By>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


export type Subscription_RootGroupTypeTranslations_By_PkArgs = {
  groupTypeCode: Scalars['String']['input'];
  languageCode: Languages_Enum;
};


export type Subscription_RootGroupTypeTranslations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GroupTypeTranslations_Stream_Cursor_Input>>;
  where?: InputMaybe<GroupTypeTranslations_Bool_Exp>;
};


export type Subscription_RootGroupTypesArgs = {
  distinct_on?: InputMaybe<Array<GroupTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypes_Order_By>>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};


export type Subscription_RootGroupTypes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GroupTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GroupTypes_Order_By>>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};


export type Subscription_RootGroupTypes_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Subscription_RootGroupTypes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GroupTypes_Stream_Cursor_Input>>;
  where?: InputMaybe<GroupTypes_Bool_Exp>;
};


export type Subscription_RootGroupsArgs = {
  distinct_on?: InputMaybe<Array<Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Groups_Order_By>>;
  where?: InputMaybe<Groups_Bool_Exp>;
};


export type Subscription_RootGroups_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Groups_Order_By>>;
  where?: InputMaybe<Groups_Bool_Exp>;
};


export type Subscription_RootGroups_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGroups_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Groups_Stream_Cursor_Input>>;
  where?: InputMaybe<Groups_Bool_Exp>;
};


export type Subscription_RootLanguagesArgs = {
  distinct_on?: InputMaybe<Array<Languages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Languages_Order_By>>;
  where?: InputMaybe<Languages_Bool_Exp>;
};


export type Subscription_RootLanguages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Languages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Languages_Order_By>>;
  where?: InputMaybe<Languages_Bool_Exp>;
};


export type Subscription_RootLanguages_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Subscription_RootLanguages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Languages_Stream_Cursor_Input>>;
  where?: InputMaybe<Languages_Bool_Exp>;
};


export type Subscription_RootMembershipsArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


export type Subscription_RootMemberships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Memberships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Memberships_Order_By>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


export type Subscription_RootMemberships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Subscription_RootMemberships_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Memberships_Stream_Cursor_Input>>;
  where?: InputMaybe<Memberships_Bool_Exp>;
};


export type Subscription_RootOwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ownerships_Order_By>>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};


export type Subscription_RootOwnerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ownerships_Order_By>>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};


export type Subscription_RootOwnerships_By_PkArgs = {
  groupId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Subscription_RootOwnerships_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ownerships_Stream_Cursor_Input>>;
  where?: InputMaybe<Ownerships_Bool_Exp>;
};


export type Subscription_RootPlanTranslationsArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


export type Subscription_RootPlanTranslations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlanTranslations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PlanTranslations_Order_By>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


export type Subscription_RootPlanTranslations_By_PkArgs = {
  languageCode: Languages_Enum;
  planCode: Scalars['String']['input'];
};


export type Subscription_RootPlanTranslations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PlanTranslations_Stream_Cursor_Input>>;
  where?: InputMaybe<PlanTranslations_Bool_Exp>;
};


export type Subscription_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootPlans_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Subscription_RootPlans_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Plans_Stream_Cursor_Input>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  uid?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailUniqueness = 'users_email_uniqueness',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "uid" */
  UsersUidUniqueness = 'users_uid_uniqueness'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Uid = 'uid'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Uid = 'uid'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type InsertGroupMutationVariables = Exact<{
  object: Groups_Insert_Input;
}>;


export type InsertGroupMutation = { __typename?: 'mutation_root', insert_groups_one?: { __typename?: 'groups', id: UuidString } | null };

export type SelectGroupsQueryVariables = Exact<{
  where?: InputMaybe<Groups_Bool_Exp>;
  lang?: InputMaybe<Languages_Enum>;
}>;


export type SelectGroupsQuery = { __typename?: 'query_root', groups: Array<{ __typename?: 'groups', id: UuidString, name: string, contract?: { __typename?: 'contracts', expireAt: TimestamptzString, maxUsers: number, planCode: string, startAt: TimestamptzString, plan: { __typename?: 'plans', planTranslations: Array<{ __typename?: 'planTranslations', text: string }> } } | null }> };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "query_root"
    },
    "mutationType": {
      "name": "mutation_root"
    },
    "subscriptionType": {
      "name": "subscription_root"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "contracts",
        "fields": [
          {
            "name": "expireAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "maxUsers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "plan",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "plans",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "planCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "startAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_avg_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_max_fields",
        "fields": [
          {
            "name": "expireAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "planCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "startAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_min_fields",
        "fields": [
          {
            "name": "expireAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "planCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "startAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_stddev_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_stddev_pop_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_stddev_samp_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_sum_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_var_pop_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_var_samp_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "contracts_variance_fields",
        "fields": [
          {
            "name": "maxUsers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments",
        "fields": [
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "groupType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments_max_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments_min_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeAssignments_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations",
        "fields": [
          {
            "name": "groupType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "language",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "languages",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "languageCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations_max_fields",
        "fields": [
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations_min_fields",
        "fields": [
          {
            "name": "groupTypeCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypeTranslations_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "groupTypeAssignments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeAssignments_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypes",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes_max_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes_min_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groupTypes_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypes",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups",
        "fields": [
          {
            "name": "contract",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "groupTypeAssignment",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "memberships",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "memberships_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "groups_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "groups_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "groups_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_max_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_min_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "groups_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "groupTypeTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "planTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "languages_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "languages",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "languages_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "languages_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages_max_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages_min_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "languages_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "languages",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships",
        "fields": [
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "groupId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "ownership",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships_max_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships_min_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "memberships_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "mutation_root",
        "fields": [
          {
            "name": "delete_contracts",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_contracts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypeAssignments",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypeAssignments_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypeTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypeTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "groupTypeCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypes",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groupTypes_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_languages",
            "type": {
              "kind": "OBJECT",
              "name": "languages_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_languages_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "languages",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_memberships",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_memberships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_ownerships",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_ownerships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_planTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_planTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "planCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_plans",
            "type": {
              "kind": "OBJECT",
              "name": "plans_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_plans_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "plans",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "insert_contracts",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_contracts_one",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypeAssignments",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypeAssignments_one",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypeTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypeTranslations_one",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypes",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groupTypes_one",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_groups_one",
            "type": {
              "kind": "OBJECT",
              "name": "groups",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_languages",
            "type": {
              "kind": "OBJECT",
              "name": "languages_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_languages_one",
            "type": {
              "kind": "OBJECT",
              "name": "languages",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_memberships",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_memberships_one",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_ownerships",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_ownerships_one",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_planTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_planTranslations_one",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_plans",
            "type": {
              "kind": "OBJECT",
              "name": "plans_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_plans_one",
            "type": {
              "kind": "OBJECT",
              "name": "plans",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_users_one",
            "type": {
              "kind": "OBJECT",
              "name": "users",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "update_contracts",
            "type": {
              "kind": "OBJECT",
              "name": "contracts_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_contracts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_contracts_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "contracts_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeAssignments",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeAssignments_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeAssignments_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeAssignments_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypeTranslations_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeTranslations_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypes",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypes_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groupTypes_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypes_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_groups",
            "type": {
              "kind": "OBJECT",
              "name": "groups_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_groups_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_languages",
            "type": {
              "kind": "OBJECT",
              "name": "languages_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_languages_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "languages",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_languages_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "languages_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_memberships",
            "type": {
              "kind": "OBJECT",
              "name": "memberships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_memberships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_memberships_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "memberships_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_ownerships",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_ownerships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_ownerships_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "ownerships_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_planTranslations",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_planTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_planTranslations_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "planTranslations_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_plans",
            "type": {
              "kind": "OBJECT",
              "name": "plans_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_plans_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "plans",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_plans_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "plans_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "update_users",
            "type": {
              "kind": "OBJECT",
              "name": "users_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_users_many",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "users_mutation_response",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updates",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "membership",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ownerships",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships_max_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships_min_fields",
        "fields": [
          {
            "name": "groupId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ownerships_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ownerships",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations",
        "fields": [
          {
            "name": "language",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "languages",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "languageCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "plan",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "plans",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "planCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations_max_fields",
        "fields": [
          {
            "name": "planCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations_min_fields",
        "fields": [
          {
            "name": "planCode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "planTranslations_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "contracts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contracts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "contracts_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "planTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "plans_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "plans",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "plans_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "plans_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans_max_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans_min_fields",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "plans_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "plans",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "query_root",
        "fields": [
          {
            "name": "contracts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contracts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "contracts_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contracts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeAssignments_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "groupTypeCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypes",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypes_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypes_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypes_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "languages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "languages",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "languages_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "languages_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "languages_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "languages",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "memberships",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "memberships_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "ownerships",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ownerships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ownerships_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ownerships_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ownerships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "planTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "planTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "planCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "plans",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "plans",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "plans_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "plans_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "plans_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "plans",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "subscription_root",
        "fields": [
          {
            "name": "contracts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contracts_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "contracts_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contracts_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "contracts",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "contracts_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "contracts",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeAssignments_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeAssignments",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypeAssignments_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeAssignments",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypeTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypeTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "groupTypeCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypeTranslations_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypeTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypes",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypes_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groupTypes_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupTypes_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groupTypes",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groupTypes_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groupTypes",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "groups_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groups_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "groups",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "groups_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "groups",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "languages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "languages",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "languages_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "languages_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "languages_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "languages",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "languages_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "languages",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "memberships_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "memberships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "memberships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "memberships_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "memberships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ownerships",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ownerships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ownerships_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ownerships_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ownerships_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "ownerships",
              "ofType": null
            },
            "args": [
              {
                "name": "groupId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "ownerships_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ownerships",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "planTranslations_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "planTranslations_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "planTranslations",
              "ofType": null
            },
            "args": [
              {
                "name": "languageCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "planCode",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "planTranslations_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "planTranslations",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "plans",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "plans",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "plans_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "plans_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "plans_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "plans",
              "ofType": null
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "plans_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "plans",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "users_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "users",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "users_stream",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "batch_size",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "users_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "users_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "users_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_max_fields",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_min_fields",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "users_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "users",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const InsertGroupDocument = gql`
    mutation InsertGroup($object: groups_insert_input!) {
  insert_groups_one(object: $object) {
    id
  }
}
    `;

export function useInsertGroupMutation() {
  return Urql.useMutation<InsertGroupMutation, InsertGroupMutationVariables>(InsertGroupDocument);
};
export const SelectGroupsDocument = gql`
    query SelectGroups($where: groups_bool_exp, $lang: languages_enum = ja) {
  groups(where: $where) {
    id
    name
    contract {
      expireAt
      maxUsers
      planCode
      startAt
      plan {
        planTranslations(where: {languageCode: {_eq: $lang}}) {
          text
        }
      }
    }
  }
}
    `;

export function useSelectGroupsQuery(options?: Omit<Urql.UseQueryArgs<SelectGroupsQueryVariables>, 'query'>) {
  return Urql.useQuery<SelectGroupsQuery, SelectGroupsQueryVariables>({ query: SelectGroupsDocument, ...options });
};