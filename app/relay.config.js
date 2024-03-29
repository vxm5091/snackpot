module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './src',
  language: 'typescript',
  schema: './src/core/graphql/schema.gql',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    'ios/**/*',
    'android/**/*',
  ],
  artifactDirectory: './src/core/graphql/__generated__',
  customScalars: {
    DateTime: 'string',
  },
  noFutureProofEnums: true,
};
