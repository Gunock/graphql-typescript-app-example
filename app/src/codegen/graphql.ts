/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Device */
export type Device = {
  __typename?: 'Device';
  firmware_version?: Maybe<FirmwareVersion>;
  firmware_version_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  update_progress?: Maybe<DeviceUpdateProgress>;
  user?: Maybe<User>;
  user_email?: Maybe<Scalars['String']['output']>;
};

/** DeviceOrder */
export type DeviceOrder = {
  last_updated?: InputMaybe<SortingOrder>;
  name?: InputMaybe<SortingOrder>;
  update_status?: InputMaybe<SortingOrder>;
  user_email?: InputMaybe<SortingOrder>;
  version?: InputMaybe<SortingOrder>;
};

/** DevicePagination */
export type DevicePagination = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

/** Device update progress */
export type DeviceUpdateProgress = {
  __typename?: 'DeviceUpdateProgress';
  last_updated?: Maybe<Scalars['DateTime']['output']>;
  update_status: DeviceUpdateStatus;
};

export enum DeviceUpdateStatus {
  Unknown = 'UNKNOWN',
  UpdateInProgress = 'UPDATE_IN_PROGRESS',
  UpToDate = 'UP_TO_DATE'
}

/** Firmware version */
export type FirmwareVersion = {
  __typename?: 'FirmwareVersion';
  id: Scalars['Int']['output'];
  major?: Maybe<Scalars['Int']['output']>;
  minor?: Maybe<Scalars['Int']['output']>;
  patch?: Maybe<Scalars['Int']['output']>;
};

/** PaginatedResult */
export type PaginatedDeviceResult = {
  __typename?: 'PaginatedDeviceResult';
  data: Array<Device>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  device_update_progress: Array<DeviceUpdateProgress>;
  devices: PaginatedDeviceResult;
  firmware_versions: Array<FirmwareVersion>;
  updates: Array<Update>;
  users: Array<User>;
};


export type QueryDevicesArgs = {
  pagination?: InputMaybe<DevicePagination>;
  sortingOrder?: InputMaybe<DeviceOrder>;
};

export enum SortingOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Update */
export type Update = {
  __typename?: 'Update';
  device_id?: Maybe<Scalars['Int']['output']>;
  finished?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
};

/** User */
export type User = {
  __typename?: 'User';
  admin?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  subscription_ends?: Maybe<Scalars['DateTime']['output']>;
};

export type GetDevicesQueryVariables = Exact<{
  sortingOrder?: InputMaybe<DeviceOrder>;
  pagination?: InputMaybe<DevicePagination>;
}>;


export type GetDevicesQuery = { __typename?: 'Query', devices: { __typename?: 'PaginatedDeviceResult', total: number, data: Array<{ __typename?: 'Device', id: number, name?: string | null, user?: { __typename?: 'User', email?: string | null, admin?: boolean | null } | null, update_progress?: { __typename?: 'DeviceUpdateProgress', last_updated?: any | null, update_status: DeviceUpdateStatus } | null, firmware_version?: { __typename?: 'FirmwareVersion', id: number, major?: number | null, minor?: number | null, patch?: number | null } | null }> } };


export const GetDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDevices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortingOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DeviceOrder"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DevicePagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortingOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortingOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"update_progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"last_updated"}},{"kind":"Field","name":{"kind":"Name","value":"update_status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firmware_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"minor"}},{"kind":"Field","name":{"kind":"Name","value":"patch"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetDevicesQuery, GetDevicesQueryVariables>;