import { Meta, storiesOf, StoryObj } from '@storybook/react';
import { Transaction } from 'components/Transaction/Transaction';
import { TransactionStoryQuery } from 'core/graphql/__generated__/TransactionStoryQuery.graphql';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { WithRelayParameters } from '@imchhh/storybook-addon-relay';


const QUERY = graphql`
  query TransactionStoryQuery {
    me {
      transactions {
        ...Transaction_data
			}
    }
  }
`;


export default {
  component: Transaction
}
export const story: StoryObj = {
  parameters: {
    relay: {
      query: QUERY,
      getReferenceEntry: res => ['transaction', res.me.transactions[0]],
    } satisfies WithRelayParameters<TransactionStoryQuery>,
  },
} satisfies Meta<typeof Transaction>;

// storiesOf('Transaction', module).add('Order Row', () => {
//   const data = useLazyLoadQuery<TransactionStoryQuery>(QUERY, {});
//
//     return (
//       <Suspense fallback={<ActivityIndicator/>}>
//       <Transaction _data={data.me.transactions[0]} />
//         </Suspense>
//     );
// });

// export default meta;
