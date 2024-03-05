import { useNavigation } from '@react-navigation/core';
import { Button, Card, Divider, Text, useTheme } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { NewTransactionOverlay, Transaction } from 'components/Transaction';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/form';
import {
  ActiveOrderCard_data$data,
  ActiveOrderCard_data$key,
} from 'core/graphql/__generated__/ActiveOrderCard_data.graphql';
import { ActiveOrderCardUpdateMyTransactionMutation } from 'core/graphql/__generated__/ActiveOrderCardUpdateMyTransactionMutation.graphql';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { graphql, useFragment, useMutation } from 'react-relay';
import { ActiveOrderCardCreateOrderMutation } from 'core/graphql/__generated__/ActiveOrderCardCreateOrderMutation.graphql';
import {
  ActiveOrderCardCompleteOrderMutation,
} from 'core/graphql/__generated__/ActiveOrderCardCompleteOrderMutation.graphql';

type TActiveOrderNode = NonNullable<ActiveOrderCard_data$data['activeOrder']>['node']
type TTransactionNode = NonNullable<TActiveOrderNode['transactions']['edges']>[number]['node']

interface IProps {
  _data: ActiveOrderCard_data$key;
}

export const ActiveOrderCard: React.FC<IProps> = ({ _data }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [showOverlay, setShowOverlay] = useState(false);

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
            ...NewTransactionOverlay_orderData
            transactions {
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
              }
            }
          }
        }
      }
    `,
    _data,
  );

  const [commitCreatedOrder, isCommittingCreateOrder] =
    useMutation<ActiveOrderCardCreateOrderMutation>(
      graphql`
        mutation ActiveOrderCardCreateOrderMutation($groupID: ID!) {
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

  const [commitCompleteOrder, isCommittingCompleteOrder] =
    useMutation<ActiveOrderCardCompleteOrderMutation>(
      graphql`
        mutation ActiveOrderCardCompleteOrderMutation(
          $input: UpdateTransactionsManyInput!
        ) {
          updateTransactionsMany(input: $input) {
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
        }
      `,
    );

  const [commitUpdateMyTransaction, isCommittingUpdateMyTransaction] =
    useMutation<ActiveOrderCardUpdateMyTransactionMutation>(
      graphql`
        mutation ActiveOrderCardUpdateMyTransactionMutation(
          $input: UpdateTransactionInput!
        ) {
          updateTransaction(input: $input) {
            #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
            node {
              ...Transaction_data
              group {
                node {
                  ...GroupBalanceCard_data
                }
              }
            }
          }
        }
      `,
    );
  
  console.log('\n');

  // ------------------------------------------ Variables ------------------------------------------
  const activeOrder = data.activeOrder?.node;
  const isPayer = activeOrder && activeOrder.payer.node.id === data.me.node.id;

  // ------------------------------------------ Form ------------------------------------------
  const transactionMap = useMemo(() => {
    const map = new Map<string, TTransactionNode>();
    
    activeOrder?.transactions.edges?.forEach(({node: txn}) => {
      console.log('adding to map', {
      id: txn.id,
        itemName: txn.itemName,
    });
      map.set(txn.id, txn);
    });
    return map;
  }, [activeOrder]);
  
  const defaultValues = {
    transactions: Array.from(transactionMap.values()).map(txn => ({
    itemName: txn.itemName,
    itemPrice: txn.itemPrice?.toString(),
    id: txn.id,
  })),
  };
  
  console.log({defaultValues});

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
  
  console.log({transactionFields: transactionFields.length});
  

  // ------------------------------------------ Handlers ------------------------------------------
  const toggleOverlay = useCallback(() => {
    setShowOverlay(prev => !prev);
  }, []);

  const handlePressGroupScreen = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);

  const handlePressCreateOrder = useCallback(() => {
    commitCreatedOrder({
      variables: {
        groupID: data.id,
      },
    });
  }, [data]);

  const handlePressCreateTransaction = useCallback(() => {
    setShowOverlay(prev => !prev);
  }, []);

  const handlePressCompleteOrder = useCallback((input: TUpdateOrderInput) => {
    commitCompleteOrder({
      variables: {
        input,
      },
    });
  }, []);

  // ------------------------------------------ Render ------------------------------------------
  const renderNavPressable = useMemo(() => {
    return (
      <TouchableOpacity onPress={handlePressGroupScreen}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Text
          style={{
            color: theme.colors.secondary,
          }}
        >
          Go to group page
        </Text>
      </TouchableOpacity>
    );
  }, [theme]);

  const renderActions = () => {
    // scenario 1: no active order -> start one
    if (!activeOrder) {
      return (
        <View>
          <Button
            onPress={handlePressCreateOrder}
            loading={isCommittingCreateOrder}
            disabled={isCommittingCreateOrder}
          >
            Start order
          </Button>
          <Text>No active order today. Go ahead and kick things off!</Text>
        </View>
      );
    }

    //   scenario 2: user is order payer -> complete
    if (isPayer) {
      return (
        <Button
          onPress={formMethods.handleSubmit(handlePressCompleteOrder)}
          loading={isCommittingCompleteOrder}
          disabled={isCommittingCompleteOrder}
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
      return <Button onPress={handlePressCreateTransaction}>Add item</Button>;
    }

    return (
      <Button onPress={handlePressCreateTransaction}>Edit my order</Button>
    );
  };

  const renderTransactions = () => {
    return transactionFields.map((txnField, i, arr) => {
      const txnData = transactionMap.get(formMethods.getValues(`transactions.${i}.id`));
      if (!txnData) {
        console.log('No transaction data found for field', txnField.id);
        return null;
      }
      const isRecipient = txnData.recipient.node.id === data.me.node.id;
      const role: TUserTransactionRole = isRecipient
        ? 'recipient'
        : isPayer
        ? 'payer'
        : 'reader';
      console.log({role});
      return (
        <Fragment key={txnData.id}>
          <Transaction
            _transactionData={txnData}
            role={role}
            index={i}
            control={formMethods.control}
            // key={txnData.id}
          />
          {i < arr.length - 1 && <Divider />}
        </Fragment>
      );
    });
  };

  const renderOverlay = () => {
    if (!activeOrder) return null;
    return (
      <NewTransactionOverlay
        isVisible={showOverlay}
        toggleIsVisible={toggleOverlay}
        _orderData={activeOrder}
      />
    );
  };

  return (
    <FormProvider {...formMethods}>
      <Reanimated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Card
          wrapperStyle={{
            rowGap: theme.spacing.xs,
          }}
        >
          <Row.Spaced
            style={{
              alignItems: 'flex-start',
            }}
          >
            <Card.Title>{data.groupName}</Card.Title>
            {renderNavPressable}
          </Row.Spaced>
          {renderTransactions()}
          {renderActions()}
        </Card>
        {/*{renderOverlay()}*/}
      </Reanimated.View>
    </FormProvider>
  );
};
