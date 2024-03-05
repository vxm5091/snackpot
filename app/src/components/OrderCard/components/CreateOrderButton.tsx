import { Button } from '@rneui/themed';
import { CreateOrderButtonMutation } from 'core/graphql/__generated__/CreateOrderButtonMutation.graphql';
import {
  CreateTransactionInput
} from 'core/graphql/__generated__/CreateTransactionButtonMutation.graphql';
import { graphql, useMutation } from 'react-relay';

interface IProps {
  groupID: string;
}

export const CreateOrderButton: React.FC<IProps> = ({ groupID }) => {
  const [commit, isCommitting] =
    useMutation<CreateOrderButtonMutation>(
      graphql`
        mutation CreateOrderButtonMutation($groupID: ID!) {
          createOrder(groupID: $groupID) {
            node {
              group {
                node {
                  ...ActiveOrderCard_data
                }
              }
            }
          }
        }
      `,
    );

  const handlePressCreateOrder = () => {
    
    commit({
      variables: {
        groupID,
      },
    });
  };

  return (
    <Button
      onPress={handlePressCreateOrder}
      loading={isCommitting}
      disabled={isCommitting}
      size={'sm'}
    >
      Start order
    </Button>
  );
};
