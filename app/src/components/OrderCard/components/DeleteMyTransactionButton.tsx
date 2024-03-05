import { Button } from '@rneui/themed';
import { DeleteMyTransactionButtonMutation } from 'core/graphql/__generated__/DeleteMyTransactionButtonMutation.graphql';
import { StyleProp, ViewStyle } from 'react-native';
import { graphql, useMutation } from 'react-relay';

interface IProps {
  orderID: string;
  groupMemberID: string;
  connectionID: string;
  onCompleted: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DeleteMyTransactionButton: React.FC<IProps> = ({ groupMemberID, orderID, connectionID, onCompleted, containerStyle }) => {
  const [commit, isCommitting] =
    useMutation<DeleteMyTransactionButtonMutation>(
      graphql`
        mutation DeleteMyTransactionButtonMutation(
          $input: DeleteTransactionInput!,
          $connections: [ID!]!
        ) {
          deleteTransaction(input: $input) @deleteEdge(connections:$connections)
        }
      `,
    );

  const handlePress = () => {
    commit({
      variables: {
        input: {
          orderID,
          groupMemberID,
        },
        connections: [connectionID],
      },
      onCompleted,
    });
  };

  return (
    <Button
      onPress={handlePress}
      loading={isCommitting}
      disabled={isCommitting}
      size={'sm'}
      color={'error'}
      containerStyle={containerStyle}
    >
      Delete mine
    </Button>
  );
};
