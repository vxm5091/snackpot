module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['relay', { artifactDirectory: './src/core/graphql/__generated__' }],
    ],
  };
};
