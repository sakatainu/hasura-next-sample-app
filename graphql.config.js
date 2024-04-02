// For "GraphQL: Language Feature Support" extension on VSCode to suggest graphql queries.

/**
 * @type {import('graphql-config').IGraphQLConfig}
 */

const schema = 'http://localhost:8081/v1/graphql'

module.exports = {
  projects: {
    hasura: {
      schema,
      documents: [
        './packages/hasura/test/permission/**/queries/!(*.d).{ts,tsx,graphql}',
      ],
    },
    console: {
      schema,
      documents: ['./packages/console/src/**/!(*.d).{ts,tsx}'],
    },
  },
}
