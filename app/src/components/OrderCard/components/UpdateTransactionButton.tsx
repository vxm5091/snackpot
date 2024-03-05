import { Button } from '@rneui/themed';
import {
  UpdateTransactionButtonMutation,
  UpdateTransactionButtonMutation$variables,
} from 'core/graphql/__generated__/UpdateTransactionButtonMutation.graphql';
import { StyleProp, ViewStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import { graphql, useMutation } from 'react-relay';

interface IProps {
  beforeCommit: () => Promise<boolean>;
  variables: UpdateTransactionButtonMutation$variables;
  containerStyle?: StyleProp<ViewStyle>;
}

export const UpdateTransactionButton: React.FC<IProps> = ({
  variables,
  containerStyle,
  beforeCommit,
}) => {
  const [commit, isCommitting] = useMutation<UpdateTransactionButtonMutation>(
    graphql`
      mutation UpdateTransactionButtonMutation(
        $input: UpdateTransactionInput!
      ) {
        updateTransaction(input: $input) {
          #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
          node {
            ...Transaction_data
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

  const handlePress = async () => {
    const validationRes = await beforeCommit();
    if (!validationRes) return;
    commit({
      variables,
      onCompleted: () => {
        Toast.show({ text1: 'Saved!', type: 'success' });
      }
    });
  };

  return (
    <Button
      containerStyle={containerStyle}
      onPress={handlePress}
      loading={isCommitting}
      disabled={isCommitting}
      size={'sm'}
      
    >
      Save mine
    </Button>
  );
};
