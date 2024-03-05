import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Overlay, Text } from '@rneui/themed';
import { ControlledInput } from 'components/ControlledInput';
import {
  createTxnSchema,
  TCreateTransactionInput,
} from 'components/Transaction/form';
import { NewTransactionOverlayCreateMutation } from 'core/graphql/__generated__/NewTransactionOverlayCreateMutation.graphql';
import { NewTransactionOverlay_orderData$key } from 'core/graphql/__generated__/NewTransactionOverlay_orderData.graphql';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { graphql, useFragment, useMutation } from 'react-relay';

interface IProps {
  _orderData: NewTransactionOverlay_orderData$key;
  isVisible: boolean;
  toggleIsVisible: () => void;
}

export const NewTransactionOverlay: React.FC<IProps> = ({
  _orderData,
  toggleIsVisible,
  isVisible,
}) => {
  // ------------------------------------------ Data ------------------------------------------
  const orderData = useFragment(
    graphql`
      fragment NewTransactionOverlay_orderData on Order {
        id
        group {
          node @required(action: THROW) {
            id
            me {
              node @required(action: THROW) {
                id
							}
						}
          }
        }
        payer {
          node {
            user {
              node @required(action: THROW) {
                username
              }
            }
          }
        }
      }
    `,
    _orderData,
  );


  const [commitCreateTxn, isCommitting] =
    useMutation<NewTransactionOverlayCreateMutation>(
      graphql`
        mutation NewTransactionOverlayCreateMutation(
          $input: CreateTransactionInput!
        ) {
          createTransaction(input: $input) {
            node @required(action: THROW) {
              order {
                node @required(action: THROW) {
                  ...Order_orderData
                }
              }
            }
          }
        }
      `,
    );

  // ------------------------------------------ Form ------------------------------------------
  const formMethods = useForm<TCreateTransactionInput>({
    mode: 'all',
    resolver: yupResolver(createTxnSchema),
    shouldFocusError: true,
    defaultValues: {
      itemName: '',
      itemPrice: '0',
    },
  });

  // ------------------------------------------ Variables ------------------------------------------
  const payerUsername = orderData.payer.node?.user?.node?.username || 'payer';

  // ------------------------------------------ Handlers ------------------------------------------
  const handlePressCreate = useCallback(
    (input: TCreateTransactionInput) => {
      commitCreateTxn({
        variables: {
          input: {
            ...input,
            itemPrice: +input.itemPrice,
            orderID: orderData.id,
            groupMemberID: orderData.group.node.me.node.id,
          },
        },
        onCompleted: () => {
          toggleIsVisible();
        },
      });
    },
    [orderData],
  );

  // ------------------------------------------ Render ------------------------------------------
  return (
    <Overlay isVisible={isVisible} onBackdropPress={toggleIsVisible}>
      <Text>What should {payerUsername} get you?</Text>
      <ControlledInput
        name={'itemName'}
        placeholder={'Item name'}
        defaultValue={''}
      />
      <ControlledInput
        name={'itemPrice'}
        placeholder={'Item price'}
        defaultValue={0}
      />
      <Text>
        Fill in the price if you have it, or {payerUsername} can fill it in
        later.
      </Text>
      <Button
        onPress={formMethods.handleSubmit(handlePressCreate)}
        loading={isCommitting}
        disabled={isCommitting}
      >
        Create
      </Button>
    </Overlay>
  );
};
