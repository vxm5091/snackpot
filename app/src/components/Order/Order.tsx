import { Badge, Button, Card, Text, useTheme } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { Transaction } from 'components/Transaction';
import { Order_meData$key } from 'core/graphql/__generated__/Order_meData.graphql';
import { Order_orderData$key } from 'core/graphql/__generated__/Order_orderData.graphql';
import { OrderUpdateMutation } from 'core/graphql/__generated__/OrderUpdateMutation.graphql';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { graphql, useFragment, useMutation } from 'react-relay';
import { formatDate } from 'shared/format';
import { useDidUpdate } from 'shared/hooks/lifecycleHooks';

interface IProps {
  _orderData: Order_orderData$key;
  _meData: Order_meData$key;
}

export const Order: React.FC<IProps> = ({ _orderData, _meData }) => {
  const {theme} = useTheme();
  const [showIncompleteError, setShowIncompleteError] = useState(false);
  
  // ------------------------------------------ Data ------------------------------------------
  const orderData = useFragment(
    graphql`
			fragment Order_orderData on Order {
				id
				createdAt
				isActive
				payer {
					node {
						user {
							node {
								id
								username
							}
						}
					}
				}
				group {
					node {
						groupName
					}
				}
				transactions {
					edges {
						node {
							...Transaction_data
							itemPrice
						}
					}
				}
			}
    `,
    _orderData,
  );

  const meData = useFragment(
    graphql`
      fragment Order_meData on User {
        id
      }
    `,
    _meData,
  );
  
  const [commitUpdateOrder, isCommittingUpdateOrder] = useMutation<OrderUpdateMutation>(graphql`
    mutation OrderUpdateMutation($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
        ...Order_orderData
      }
    }
  `);
  
  
  

  // ------------------------------------------ Variables ------------------------------------------
  const dateStr = useMemo(
    () => formatDate(orderData.createdAt),
    [orderData.createdAt],
  );
  
  const isPayer = useMemo(() => orderData.payer.node!.user.node!.id === meData.id, [orderData, meData]);
  
  const canEdit = useMemo(() => {
    return isPayer && orderData.isActive;
  }, [isPayer, orderData]);
  
  const canComplete = useMemo(() => {
    if (!canEdit) return false;
    return orderData.transactions.edges?.every(txn => !!txn.node!.itemPrice);
  }, [orderData, canEdit]);
  
  
  
  
  
  
  // ------------------------------------------ Handlers ------------------------------------------
  const handlePressComplete = useCallback(() => {
    setShowIncompleteError(!canComplete);
    if (!canComplete) {
      return;
    }
    commitUpdateOrder({
      variables: {
        input: {
          id: orderData.id,
          isActive: false,
        },
      },
    });
  }, [canComplete, commitUpdateOrder, orderData]);
  

  // ------------------------------------------ Render ------------------------------------------
  const renderTransactions = useMemo(() => {
    return orderData.transactions.edges?.map((txn, i, arr) => (
      <Transaction _transactionData={txn.node!} isLast={i === arr.length - 1} key={i} canEdit={canEdit} />
    ));
  }, [orderData, canEdit]);
  
  const renderErrorMessage = useMemo(() => {
    if (!canEdit || !showIncompleteError) return null;
    return (
      <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
        <Text style={{
          width: '100%',
          textAlign: 'center',
          color: theme.colors.error,
          fontWeight: '500',
        }}>Fill in everyone's price first. Get those points!</Text>
          </Reanimated.View>
    );
  }, [showIncompleteError, canEdit]);
  
  const renderSubmitSection = useMemo(() => {
    if (!canEdit) return null;
    return (
      <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} style={{
        rowGap: theme.spacing.md,
      }}>
        {renderErrorMessage}
        <Button title={'Complete'} onPress={handlePressComplete} loading={isCommittingUpdateOrder}/>
      </Reanimated.View>
    );
  }, [canEdit, handlePressComplete, isCommittingUpdateOrder, renderErrorMessage, theme]);
  
  
  const renderActiveBadge = useMemo(() => {
    if (!orderData.isActive) return null;
    return (
      <Badge status={'primary'} value={'Active'}/>
    );
  }, [orderData]);

  return (
    <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
    <Card wrapperStyle={{
      rowGap: theme.spacing.md,
    }}>
      <Row style={{
        columnGap: theme.spacing.sm,
      }}>
      <Card.Title>{dateStr}</Card.Title>
        {renderActiveBadge}
        </Row>
      <Row style={{
        marginBottom: theme.spacing.md,
      }}>
        <Text>Paid by {orderData.payer.node!.user.node!.username}</Text>
        {/*  TODO include payer's balance from this order*/}
      </Row>
      <View>{renderTransactions}</View>
      {renderSubmitSection}
    </Card>
      </Reanimated.View>
  );
};
