import { CodegenConfig } from "@graphql-codegen/cli";

// https://www.wantedly.com/companies/wantedly/post_articles/387161
const additionalPlugins = [
  {
    add: {
      content: `
      export const assertBrandedString : <T>(a: unknown) => asserts a is T = (a) => {
        if (typeof a !== 'string') throw new Error(\`\$\{a\} is not string\`);
      }
      `,
    },
  },
  {
    add: {
      content:
        "export type DateString = string & { __dateStringBrand: never };",
    },
  },
  {
    add: {
      content:
        "export type TimestampString = string & { __timestampStringBrand: never };",
    },
  },
  {
    add: {
      content:
        "export type TimestamptzString = string & { __timestamptzStringBrand: never };",
    },
  },
  {
    add: {
      content:
        "export type UuidString = string & { __UuidStringBrand: never };",
    },
  },
  {
    add: {
      content: `
      export const brandedString = <T>(a: unknown): T => {
        assertBrandedString<T>(a);
        return a;
      };
      `,
    },
  },
];

const scalars = {
  _text: "string",
  _uuid: "string",
  json: "object",
  bigint: "number",
  date: "DateString",
  float8: "number",
  timestamp: "TimestampString",
  timestamptz: "TimestamptzString",
  uuid: "UuidString",
  daterange: "string",
  groupServiceAccountTokenPriority: "string",
};

const config = {
  // defaultScalarType: 'unknown',
  strictScalars: true,
  scalars,
};

const codegenConfig: CodegenConfig = {
  schema: ["http://hasura:8080/v1/graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./packages/console/generated/graphql.ts": {
      documents: ["./packages/console/src/**/!(*.d).{ts,tsx}"],
      plugins: [
        ...additionalPlugins,
        "typescript",
        "typescript-operations",
        "urql-introspection",
        {
          "typescript-urql": {
            gqlImport: "urql#gql",
          },
        },
      ],
      config,
    },
    "./packages/components/generated/graphql.ts": {
      documents: ["./packages/components/src/**/!(*.d).{ts,tsx}"],
      plugins: [
        ...additionalPlugins,
        "typescript",
        "typescript-operations",
        "urql-introspection",
        {
          "typescript-urql": {
            gqlImport: "urql#gql",
          },
        },
      ],
      config,
    },
  },
};

export default codegenConfig;
