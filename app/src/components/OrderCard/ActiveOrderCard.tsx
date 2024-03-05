import { useNavigation } from '@react-navigation/core';
import { Badge, Button, Card, Text, useTheme } from '@rneui/themed';
import {
  CreateOrderButton,
  CreateTransactionButton,
  DeleteMyTransactionButton,
  UpdateTransactionButton,
} from 'components/OrderCard/components';
import { Row, Spacer, Stack } from 'components/layout';
import { Transaction } from 'components/Transaction';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/form';
import {
  ActiveOrderCard_data$data,
  ActiveOrderCard_data$key,
} from 'core/graphql/__generated__/ActiveOrderCard_data.graphql';
import { CreateTransactionButtonMutation$data } from 'core/graphql/__generated__/CreateTransactionButtonMutation.graphql';
import { Fragment, useCallback, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { graphql, useFragment, useMutation } from 'react-relay';
import { ActiveOrderCardCompleteOrderMutation } from 'core/graphql/__generated__/ActiveOrderCardCompleteOrderMutation.graphql';
import { ActiveOrderCardSimulateMutation } from 'core/graphql/__generated__/ActiveOrderCardSimulateMutation.graphql';

type TActiveOrderNode = NonNullable<
  ActiveOrderCard_data$data['activeOrder']
>['node'];
type TTransactionNode = NonNullable<
  TActiveOrderNode['transactions']['edges']
>[number]['node'];

interface IProps {
  _data: ActiveOrderCard_data$key;
  context: 'HomeScreen' | 'GroupScreen';
}

export const ActiveOrderCard: React.FC<IProps> = ({ _data, context }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [_mr, setManualRender] = useState(0);

  // ------------------------------------------ Data ------------------------------------------
  const data = useFragment(
    graphql`
      fragment ActiveOrderCard_data on Group {
        id
        groupName
        avatarURL
        me {
          node @required(action: THROW) {
            id
          }
        }
        activeOrder {
          node @required(action: THROW) {
            id
            transactions {
              __id
              edges {
                node @required(action: THROW) {
                  ...Transaction_data
                  id
                  itemName
                  itemPrice
                  recipient {
                    node @required(action: THROW) {
                      id
                    }
                  }
                }
              }
            }
            payer {
              node @required(action: THROW) {
                id
                user {
                  node @required(action: THROW) {
                    username
                  }
                }
              }
            }
          }
        }
      }
    `,
    _data,
  );

  const [commitCompleteOrder, isCommittingCompleteOrder] =
    useMutation<ActiveOrderCardCompleteOrderMutation>(
      graphql`
        mutation ActiveOrderCardCompleteOrderMutation(
          $transactionInput: UpdateTransactionsManyInput!
          $orderInput: UpdateOrderInput!
        ) {
          updateTransactionsMany(input: $transactionInput) {
            edges {
              node {
                #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
                ...Transaction_data
                group {
                  node {
                    ...GroupBalanceCard_data
                  }
                }
              }
            }
          }

          updateOrder(input: $orderInput) {
            group {
              node {
                ...GroupBalanceCard_data
                ...ActiveOrderCard_data
              }
            }
          }
        }
      `,
    );

  const [commitSimulate, isCommittingSimulate] =
    useMutation<ActiveOrderCardSimulateMutation>(
      graphql`
        mutation ActiveOrderCardSimulateMutation(
          $orderID: ID!
          $connections: [ID!]!
        ) {
          simulateTransactions(orderID: $orderID)
            @appendEdge(connections: $connections) {
            node @required(action: THROW) {
              id
              itemName
              itemPrice
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

  // ------------------------------------------ Variables ------------------------------------------
  const activeOrder = data.activeOrder?.node;
  const transactionConnectionID = activeOrder?.transactions.__id; // use this to remove edge when deleting user transaction
  const isPayer = activeOrder && activeOrder.payer.node.id === data.me.node.id;
  const usernamePayingStr = useMemo(() => {
    if (!activeOrder) return null;
    if (isPayer) return 'Your turn to pay!';
    const username = activeOrder.payer.node.user.node.username;
    return `${username}'s turn to pay!`;
  }, [activeOrder, isPayer]);

  // ------------------------------------------ Form ------------------------------------------
  const transactionMap = useMemo(() => {
    const map = new Map<string, TTransactionNode>();

    activeOrder?.transactions.edges?.forEach(({ node: txn }) => {
      map.set(txn.id, txn);
    });
    return map;
  }, [activeOrder]);

  const transactionArray = Array.from(transactionMap.values());
  const userIndex = transactionArray.findIndex(
    txn => txn.recipient.node.id === data.me.node.id,
  );

  const defaultValues = {
    transactions: transactionArray.map(txn => ({
      itemName: txn.itemName,
      itemPrice: txn.itemPrice,
      id: txn.id,
    })),
  };

  const formMethods = useForm<TUpdateOrderInput>({
    mode: 'all',
    shouldFocusError: true,
    defaultValues,
  });

  const {
    fields: transactionFields,
    append: appendTransaction,
    remove: removeTransaction,
  } = useFieldArray({
    control: formMethods.control,
    name: 'transactions',
  });

  const formValues = useWatch({
    control: formMethods.control,
    name: 'transactions',
  });
  // console.log({ formValues });

  // ------------------------------------------ Handlers ------------------------------------------

  const handlePressGroupScreen = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);

  const onCreateTransactionComplete = useCallback(
    (res: CreateTransactionButtonMutation$data) => {
      appendTransaction({
        itemPrice: null,
        itemName: '',
        id: res.createTransaction.node!.id,
      });
    },
    [],
  );

  const beforeUpdateTransaction = useCallback(async () => {
    if (!userIndex) return false;
    const userRow = `transactions.${userIndex}`;
    const isValid = await formMethods.trigger(userRow, { shouldFocus: true });
    console.log({ isValid });
    if (!isValid) {
      // because the validation check is async, the result evaluates after the render cycle and a separate re-render isn't triggered otherwise. we trigger it manually to display field errors
      setManualRender(prev => prev + 1);
    }
    return isValid;
  }, [formMethods, userIndex]);

  const handlePressCompleteOrder = useCallback(
    (input: TUpdateOrderInput) => {
      // convert itemPrice to number
      const transactionInput = { ...input };
      input.transactions.forEach(txn => {
        txn.itemPrice = parseFloat(txn.itemPrice as unknown as string);
      });

      commitCompleteOrder({
        variables: {
          transactionInput,
          orderInput: {
            id: activeOrder!.id,
            isActive: false,
          },
        },
      });
    },
    [activeOrder],
  );

  const handlePressSimulate = useCallback(() => {
    if (!activeOrder) return;
    commitSimulate({
      variables: {
        orderID: activeOrder.id,
        connections: [transactionConnectionID || ''],
      },
      onCompleted: res => {
        const payload = res.simulateTransactions.map(
          ({ node: transaction }) => ({
            itemName: transaction.itemName,
            itemPrice: transaction.itemPrice,
            id: transaction.id,
          }),
        );
        console.log(payload);
        appendTransaction(payload);
      },
    });
  }, [activeOrder, appendTransaction]);

  // ------------------------------------------ Render ------------------------------------------
  const renderNavPressable = useMemo(() => {
    return (
      <TouchableOpacity onPress={handlePressGroupScreen}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Text
          style={{
            color: theme.colors.primary,
          }}
        >
          Go to group page
        </Text>
      </TouchableOpacity>
    );
  }, [theme]);

  const renderSimulateTransactionButton = useMemo(() => {
    if (!activeOrder) return null;
    return (
      <Button
        color={'primary'}
        type={'outline'}
        onPress={handlePressSimulate}
        loading={isCommittingSimulate}
        disabled={isCommittingSimulate}
        size={'sm'}
      >
        Simulate transactions
      </Button>
    );
  }, [activeOrder, transactionConnectionID, appendTransaction]);

  const renderActions = () => {
    // scenario 1: no active order -> start one
    if (!activeOrder) {
      return (
        <Stack>
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            No active order today. Go ahead and kick things off!
          </Text>
          <CreateOrderButton groupID={data.id} />
        </Stack>
      );
    }

    //   scenario 2: user is order payer -> complete
    if (isPayer) {
      return (
        <Button
          onPress={formMethods.handleSubmit(handlePressCompleteOrder)}
          loading={isCommittingCompleteOrder}
          disabled={isCommittingCompleteOrder}
          size={'sm'}
        >
          Complete order
        </Button>
      );
    }

    //   scenario 3: user doesn't have a transaction yet -> create
    if (
      !activeOrder.transactions.edges?.some(
        txnEdge => txnEdge.node.recipient.node.id === data.me.node.id,
      )
    ) {
      return (
        <Stack spacing={'sm'}>
          <CreateTransactionButton
            orderID={activeOrder.id}
            groupMemberID={data.me.node.id}
            onCompleted={onCreateTransactionComplete}
          />
          {renderSimulateTransactionButton}
        </Stack>
      );
    }

    return (
      <Stack spacing={'md'}>
        <Row>
          <DeleteMyTransactionButton
            orderID={activeOrder.id}
            groupMemberID={data.me.node.id}
            connectionID={transactionConnectionID || ''}
            onCompleted={() => {
              removeTransaction(userIndex);
            }}
            containerStyle={styles.buttonContainer}
          />
          <UpdateTransactionButton
            containerStyle={styles.buttonContainer}
            variables={{
              input: formMethods.getValues(`transactions.${userIndex}`),
            }}
            beforeCommit={beforeUpdateTransaction}
          />
        </Row>
        <Row>
          <View style={styles.buttonContainer}>
            {renderSimulateTransactionButton}
          </View>
          <Button
            onPress={formMethods.handleSubmit(handlePressCompleteOrder)}
            loading={isCommittingCompleteOrder}
            disabled={isCommittingCompleteOrder}
            size={'sm'}
            containerStyle={{ ...styles.buttonContainer, alignSelf: 'stretch' }}
            type={'outline'}
          >
            {'Simulate end \norder'}
          </Button>
        </Row>
      </Stack>
    );
  };

  const renderTransactions = () => {
    return transactionFields.map((txnField, i, arr) => {
      const txnData = transactionMap.get(
        formMethods.getValues(`transactions.${i}.id`),
      );
      if (!txnData) {
        return null;
      }
      const isRecipient = txnData.recipient.node.id === data.me.node.id;
      const role: TUserTransactionRole = isRecipient
        ? 'recipient'
        : isPayer
        ? 'payer'
        : 'reader';
      return (
        <Fragment key={txnData.id}>
          <Transaction
            _transactionData={txnData}
            role={role}
            index={i}
            control={formMethods.control}
            // key={txnData.id}
          />
          <Spacer />
        </Fragment>
      );
    });
  };

  const renderHeader = useMemo(() => {
    const title = context === 'GroupScreen' ? 'Active order' : data.groupName;
    
    return (
      <Stack spacing={'sm'}>
        <Row.Spaced
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Card.Title>{title}</Card.Title>
          {context !== 'GroupScreen' && renderNavPressable}
        </Row.Spaced>
        {isPayer && (
          <Card.FeaturedSubtitle
            style={{
              color: theme.colors.grey2,
              marginTop: 0,
            }}
          >
            Update the right amounts before completing the order. You can
            optionally update the item names.
          </Card.FeaturedSubtitle>
        )}
        <Row>
          <Badge
            value={usernamePayingStr}
            status={'success'}
          />
        </Row>
      </Stack>
    );
  }, [data, renderNavPressable, theme]);

  return (
    <FormProvider {...formMethods}>
      <Reanimated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Card
          wrapperStyle={{
            rowGap: theme.spacing.md,
          }}
        >
          {renderHeader}
          <View>{renderTransactions()}</View>
          {renderActions()}
        </Card>
        {/*{renderOverlay()}*/}
      </Reanimated.View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
});
