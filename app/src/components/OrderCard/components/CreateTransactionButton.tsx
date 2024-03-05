import { Button } from '@rneui/themed';


import {
  CreateTransactionButtonMutation,
  CreateTransactionButtonMutation$data,
} from 'core/graphql/__generated__/CreateTransactionButtonMutation.graphql';
import { graphql, useMutation } from 'react-relay';

interface IProps {
  orderID: string;
  groupMemberID: string;
  onCompleted: (res: CreateTransactionButtonMutation$data) => void;
}

export const CreateTransactionButton: React.FC<IProps> = ({orderID, groupMemberID, onCompleted}) => {
  const [commit, isCommitting] =
    useMutation<CreateTransactionButtonMutation>(
      graphql`
        mutation CreateTransactionButtonMutation(
          $input: CreateTransactionInput!
        ) {
          createTransaction(input: $input) {
            #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
            node {
              ...Transaction_data
              id
              group {
                node {
                  ...GroupBalanceCard_data
                  ...ActiveOrderCard_data
                }
              }
            }
          }
        }
      `,
    );
  
  const handlePress = () => {
    commit({
      variables: {
        input: {
          itemName: '',
          orderID,
          groupMemberID,
        },
      },
      onCompleted,
    });
  };
  
  return (
    <Button onPress={handlePress} size={'sm'} loading={isCommitting} disabled={isCommitting}>Add item</Button>
  );
};
