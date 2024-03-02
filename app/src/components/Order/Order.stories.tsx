import { Order } from 'components/Order/Order';
import { graphql } from 'react-relay';

const QUERY = graphql`
  query OrderStoryQuery {
    me {
      ...Order_meData
      ordersPaid {
        edges {
          node {
            ...Order_orderData
          }
        }
      }
    }
  }
`;

export default {
  component: Order,
};

export const story = {
  parameters: {
    relay: {
      query: QUERY,
      getReferenceEntry: res => ['order', res.me.ordersPaid.edges[0].node!],
    },
  },
};
