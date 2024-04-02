import { getClient, roles } from '@/utils/graphql'
import { assertStringRecord } from '@/utils/assert'

export const getAnonymousClient = () => getClient({
  'X-Hasura-Role': roles.anonymous,
})

export const getUserClient = (userId: string, email?: string) => getClient({
  'X-Hasura-Role': roles.user,
  'X-Hasura-User-id': userId,
  ...email && { 'X-Hasura-User-Email': email },
})

export const getStaffClient = (userId: string) => getClient({
  'X-Hasura-Role': roles.staff,
  'X-Hasura-User-id': userId,
})

export const getSystemClient = () => getClient({
  'X-Hasura-Role': roles.system,
  'X-Hasura-Use-Backend-Only-Permissions': 'true',
})

export const getActionsClient = (
  variables: Record<string, unknown>,
) => {
  assertStringRecord(variables)
  return getClient(variables)
}

export const getAdminClient = getClient

export default getSystemClient
