import { useNavigation } from '@react-navigation/core';
import { Badge, Button, Card, Text, useTheme } from '@rneui/themed';
import { Row, Spacer, Stack } from 'components/layout';
import {
  CreateOrderButton,
  CreateTransactionButton,
  DeleteMyTransactionButton,
  UpdateTransactionButton,
} from 'components/OrderCard/components';
import { Transaction } from 'components/Transaction';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/types';
import {
  ActiveOrderCard_data$data,
  ActiveOrderCard_data$key,
} from 'core/graphql/__generated__/ActiveOrderCard_data.graphql';
import { ActiveOrderCardCompleteOrderMutation } from 'core/graphql/__generated__/ActiveOrderCardCompleteOrderMutation.graphql';
import { ActiveOrderCardSimulateMutation } from 'core/graphql/__generated__/ActiveOrderCardSimulateMutation.graphql';
import { CreateTransactionButtonMutation$data } from 'core/graphql/__generated__/CreateTransactionButtonMutation.graphql';
import { Fragment, useCallback, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useDidMount, useDidUpdate } from 'shared/hooks/lifecycleHooks';

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
  // const [hasAddedRow, setHasAddedRow] = useState(false);
  const [userIndex, setUserIndex] = useState<null | number>(null);
  const [userTransactionID, setUserTransactionID] = useState<string>('temp');
  // const [hasRow, setHasRow] = useState(false);

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
            user {
              node @required(action: THROW) {
                ...Transaction_data
              }
            }
          }
        }
        activeOrder {
          node @required(action: THROW) {
            id
            transactions {
              __id
              edges {
                node @required(action: THROW) {
                  id
                  itemName
                  itemPrice
                  recipient {
                    node @required(action: THROW) {
                      id
                      user {
                        node @required(action: THROW) {
                          ...Transaction_data
                        }
                      }
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

                group {
                  node {
                    ...MemberBalanceCard_data
                  }
                }
              }
            }
          }

          updateOrder(input: $orderInput) {
            group {
              node {
                ...MemberBalanceCard_data
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
  const userHasTransaction = useMemo(
    () =>
      activeOrder?.transactions.edges?.some(
        txnEdge => txnEdge.node.recipient.node.id === data.me.node.id,
      ),
    [activeOrder, data],
  );

  // ------------------------------------------ Form ------------------------------------------
  const transactionMap = useMemo(() => {
    const map = new Map<string, TTransactionNode>();

    activeOrder?.transactions.edges?.forEach(({ node: txn }) => {
      map.set(txn.id, txn);
    });
    return map;
  }, [activeOrder]);

  const transactionArray = Array.from(transactionMap.values());

  const defaultValues = {
    transactions: transactionArray.map(txn => ({
      itemName: txn.itemName,
      itemPrice: txn.itemPrice?.toString(),
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
    keyName: 'fieldID',
  });

  const formValues = useWatch({
    control: formMethods.control,
    name: 'transactions',
  });

  // ------------------------------------------ Side Effects ------------------------------------------

  useDidMount(() => {
    let res: string | null = null;
    for (const txnField of formValues) {
      const txn = transactionMap.get(txnField.id);
      if (!txn) continue;
      if (txn.recipient.node.id === data.me.node.id) {
        res = txn.id;
        break;
      }
    }

    // if there's a user row already, find the index and store in state
    if (res) {
      const index = formValues.findIndex(txn => txn.id === res);
      setUserIndex(index);
      setUserTransactionID(res);
    }
  });

  useDidUpdate(() => {
    if (userIndex !== null) return;
    const index = formValues.findIndex(txn => txn.id === userTransactionID);
    if (index !== -1) {
      setUserIndex(index);
    }
  }, [formValues, userIndex]);

  // ------------------------------------------ Handlers ------------------------------------------

  const handleCreateTransactionRow = useCallback(() => {
    appendTransaction({
      itemName: '',
      itemPrice: null,
      id: userTransactionID,
    });
  }, []);

  const handleDeleteTransactionRow = useCallback(() => {
    if (userIndex === null) {
      console.error('No user index found');
      return;
    }
    removeTransaction(userIndex);
    setUserIndex(null);
    setUserTransactionID('temp');
  }, [userIndex]);

  const handlePressGroupScreen = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);

  const onCreateTransactionComplete = useCallback(
    (res: CreateTransactionButtonMutation$data) => {
      if (userIndex === null) {
        console.error('No user index found');
        return;
      }
      // update form state with the newly created id
      const id = res.createTransaction.node.id;
      formMethods.setValue(`transactions.${userIndex}.id`, id);
      setUserTransactionID(id);

      Toast.show({ text1: 'Created!', type: 'success' });
    },
    [formMethods, userIndex],
  );

  const beforeUpdateTransaction = useCallback(async () => {
    Keyboard.dismiss();
    if (userIndex === null) {
      console.error('No user index found');
      return false;
    }
    const userRow = `transactions.${userIndex}`;
    const isValid = await formMethods.trigger(userRow, { shouldFocus: true });
    if (!isValid) {
      // because the validation check is async, the result evaluates after the render cycle and a separate re-render isn't triggered otherwise. we trigger it manually to display field errors
      setManualRender(prev => prev + 1);
    }
    return isValid;
  }, [formMethods, userIndex]);

  const handlePressCompleteOrder = useCallback(
    (input: TUpdateOrderInput) => {
      // convert itemPrice to number
      Keyboard.dismiss();
      commitCompleteOrder({
        variables: {
          transactionInput: input,
          orderInput: {
            id: activeOrder!.id,
            isActive: false,
          },
        },
        onCompleted: () => {
          formMethods.reset({ transactions: [] });
          setUserIndex(null);
          setUserTransactionID('temp');
        },
      });
    },
    [activeOrder, formMethods],
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
            itemPrice: transaction.itemPrice?.toString(),
            id: transaction.id,
          }),
        );
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

  const renderSimulateTransactionButton = () => {
    if (!activeOrder) return null;
    return (
      <Button
        color={'primary'}
        type={'outline'}
        onPress={handlePressSimulate}
        size={'sm'}
      >
        Simulate transactions
      </Button>
    );
  };

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
            No active order. Go ahead and kick things off!
          </Text>
          <CreateOrderButton groupID={data.id} />
        </Stack>
      );
    }

    //   scenario 2: user is order payer -> complete
    if (isPayer) {
      return (
        <Stack spacing={'sm'} style={styles.buttonContainer}>
          <Button
            onPress={formMethods.handleSubmit(handlePressCompleteOrder)}
            loading={isCommittingCompleteOrder}
            disabled={isCommittingCompleteOrder}
            size={'sm'}
          >
            Complete order
          </Button>
          {renderSimulateTransactionButton()}
        </Stack>
      );
    }

    //   scenario 3: user doesn't have a transaction yet -> create
    if (!userHasTransaction) {
      return (
        <Stack spacing={'sm'}>
          <CreateTransactionButton
            orderID={activeOrder.id}
            groupMemberID={data.me.node.id}
            onCompleted={onCreateTransactionComplete}
            userIndex={userIndex}
            createTransactionRow={handleCreateTransactionRow}
            input={userIndex !== null ? formValues[userIndex] : undefined}
            beforeTransaction={beforeUpdateTransaction}
          />
          {/*{renderSimulateTransactionButton()}*/}
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
            onCompleted={handleDeleteTransactionRow}
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
            {renderSimulateTransactionButton()}
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
    return transactionFields.map((transactionField, i) => {
      if (!activeOrder) return null;

      // there are two recipient scenarios here:
      // 1) transaction data already exists on the backend, in which case transactionField will have an id + transaction data at that id key in transactionMap
      // 2) user just appended a row -- no id yet, so we use the user's own data
      const txnData = transactionField.id
        ? transactionMap.get(transactionField.id)
        : null;

      let isRecipient = false;
      if (
        transactionField.id === 'temp' ||
        (txnData && txnData.recipient.node.id === data.me.node.id)
      ) {
        isRecipient = true;
      }

      const role: TUserTransactionRole = isRecipient
        ? 'recipient'
        : isPayer
        ? 'payer'
        : 'reader';
      return (
        <Fragment key={transactionField.fieldID}>
          <Transaction
            _recipientData={
              txnData
                ? txnData.recipient.node.user.node
                : data.me.node.user.node
            }
            role={role}
            index={i}
            key={transactionField.fieldID}
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
        {activeOrder && (
          <Row>
            <Badge value={usernamePayingStr} status={'success'} />
          </Row>
        )}
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
