import fetch from 'cross-fetch'
import {
  createClient,
  // dedupExchange,
  // cacheExchange,
  fetchExchange,
  type Client,
} from '@urql/core';
import { GRAPHQL_BASE_URL, GRAPHQL_ADMIN_SECRET } from '@/utils/env'
import { assertString } from '@/utils/assert'

const exchanges = [
  // dedupExchange,
  // cacheExchange,
  fetchExchange,
]

export default (headers?: Record<string, string>) : Client => {
  assertString(GRAPHQL_ADMIN_SECRET)
  assertString(GRAPHQL_BASE_URL)

  const url = `${GRAPHQL_BASE_URL}/v1/graphql`
  const options = {
    headers: {
      'X-Hasura-Admin-Secret': GRAPHQL_ADMIN_SECRET,
      ...headers,
    },
  }
  const fetchOptions = () => options

  const client = createClient({ url, fetch, fetchOptions, exchanges })
  return client
}
