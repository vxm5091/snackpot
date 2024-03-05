import { Button } from '@rneui/themed';
import {
  CreateTransactionButtonMutation,
  CreateTransactionButtonMutation$data,
} from 'core/graphql/__generated__/CreateTransactionButtonMutation.graphql';
import { UpdateTransactionInput } from 'core/graphql/__generated__/UpdateTransactionButtonMutation.graphql';
import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';

interface IProps {
  orderID: string;
  groupMemberID: string;
  beforeTransaction: () => Promise<boolean>;
  onCompleted: (res: CreateTransactionButtonMutation$data) => void;
  createTransactionRow: () => void;
  input?: UpdateTransactionInput;
  userIndex: number | null;
}

export const CreateTransactionButton: React.FC<IProps> = ({
  orderID,
  groupMemberID,
  onCompleted,
  createTransactionRow,
  input,
  beforeTransaction,
  userIndex,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [commit, isCommitting] = useMutation<CreateTransactionButtonMutation>(
    graphql`
      mutation CreateTransactionButtonMutation(
        $input: CreateTransactionInput!
      ) {
        createTransaction(input: $input) {
          #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
          node @required(action: THROW) {
            id
            group {
              node {
                ...MemberBalanceCard_data
                ...ActiveOrderCard_data
              }
            }
          }
        }
      }
    `,
  );

  const handlePress = async () => {
    try {
      if (userIndex === null) {
        return createTransactionRow();
      }

      if (!input) {
        console.error('No input');
        return;
      }

      const isValid = await beforeTransaction();
      if (!isValid) return;

      commit({
        variables: {
          input: {
            itemName: input.itemName as string,
            itemPrice: input.itemPrice as string,
            orderID,
            groupMemberID,
          },
        },
        onCompleted: res => {
          onCompleted(res);
          setIsDisabled(true);
        },
      });

      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onPress={handlePress}
      size={'sm'}
      loading={isCommitting || isDisabled}
      disabled={isCommitting || isDisabled}
    >
      {userIndex !== null ? 'Confirm' : 'Add item'}
    </Button>
  );
};
