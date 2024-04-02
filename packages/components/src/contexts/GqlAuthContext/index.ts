import { UuidString } from '@sample/components/generated/graphql';
import { createContext, useContext } from 'react';

export type Role = 'staff' | 'user' | 'service-account' | 'anonymous';
export type UserId = UuidString | null;
export type GroupId = UuidString | null;
export type ServiceAccountId = UuidString | null;
export type JWT = string | null;
export type GraphqlAuth = {
  role: Role;
  jwt?: JWT;
  userId?: UserId;
  groupId?: GroupId;
  serviceAccountId?: ServiceAccountId;
};
export const AuthContext = createContext<GraphqlAuth>({
  role: 'anonymous',
});
export const useGraphqlAuth = () => useContext(AuthContext);
