import Logger from 'core/logger';
import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import config from 'core/config';
import fetchRetryWrapper from 'fetch-retry';
const fetchRetry = fetchRetryWrapper(fetch);


/* ANCHOR ================================= HTTP Network ======================================== */
async function fetchQuery(params: RequestParameters, variables: Variables) {
  try {
    // const API_HTTP = `http://${process.env.EXPO_PUBLIC_IP}:3000/graphql`
    const response = await fetchRetry(config.API_HTTP, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: params.text, // GraphQL text from input
        variables,
      }),
    });

    return response.json();
  } catch (err) {
    Logger.error('Relay fetch error', err);
    return {};
  }
}


// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
});

export default environment;

