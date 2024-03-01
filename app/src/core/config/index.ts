const config_DEV = {
  API_HTTP: 'http://localhost:3000/graphql',
};

const config_PROD = {
  API_HTTP: 'http://localhost:3000/graphql',
};

const appConfig = {
  ...(__DEV__ ? config_DEV : config_PROD),
};

export default appConfig;
