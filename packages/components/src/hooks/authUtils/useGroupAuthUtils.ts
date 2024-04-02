import React, { createElement, useCallback, useMemo } from 'react';

export type AllowGroupFn = (allows: string[]) => boolean;
export type GroupRolePermissionProps = {
  allows: string[];
  children: React.ReactNode;
};

export type GroupAuthUtilsHook = (role: string | undefined) => {
  allow: AllowGroupFn;
  GroupPermission: React.ElementType<GroupRolePermissionProps>;
};

const useGroupAuthUtils: GroupAuthUtilsHook = (role) => {
  const allow = useCallback<AllowGroupFn>(
    (allows) => !!role && allows.includes(role),
    [role]
  );

  const GroupPermission = useCallback(
    ({ allows, children }: GroupRolePermissionProps) =>
      allow(allows) ? createElement(React.Fragment, null, children) : null,
    [allow]
  );

  return useMemo(
    () => ({
      allow,
      GroupPermission,
    }),
    [GroupPermission, allow]
  );
};

export default useGroupAuthUtils;
