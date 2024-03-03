import { Badge, Card, Text, useTheme } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { Transaction } from 'components/Transaction';
import { UserAvatar } from 'components/UserAvatar';
import { Order_meData$key } from 'core/graphql/__generated__/Order_meData.graphql';
import { Order_orderData$key } from 'core/graphql/__generated__/Order_orderData.graphql';
import { useMemo } from 'react';
import { View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { graphql, useFragment } from 'react-relay';
import { formatDate } from 'shared/format';

interface IProps {
  _orderData: Order_orderData$key;
  _meData: Order_meData$key;
}

export const Order: React.FC<IProps> = ({ _orderData, _meData }) => {
  const {theme} = useTheme();
  // ------------------------------------------ Data ------------------------------------------
  const orderData = useFragment(
    graphql`
      fragment Order_orderData on Order {
        id
        createdAt
        isActive
        payer {
          node {
            id
            username
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
  

  // ------------------------------------------ Variables ------------------------------------------
  const dateStr = useMemo(
    () => formatDate(orderData.createdAt),
    [orderData.createdAt],
  );
  
  const isPayer = useMemo(() => orderData.payer.node!.id === meData.id, [orderData, meData])
  
  const canEdit = useMemo(() => {
    return isPayer && orderData.isActive
  }, [isPayer, orderData])
  
  const canComplete = useMemo(() => {
    if (!canEdit) return false;
    return orderData.transactions.edges?.every(txn => !!txn.node!.itemPrice)
  }, [orderData, canEdit])

  // ------------------------------------------ Render ------------------------------------------
  const renderTransactions = useMemo(() => {
    return orderData.transactions.edges?.map((txn, i, arr) => (
      <Transaction _data={txn.node!} isLast={i === arr.length - 1} key={i} canEdit={canEdit} />
    ));
  }, [orderData]);
  
  const renderActiveBadge = useMemo(() => {
    if (!orderData.isActive) return null;
    return (
      <Badge status={'primary'} value={'Active'}/>
    )
  }, [orderData])

  return (
    <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
    <Card>
      <Row style={{
        columnGap: theme.spacing.sm,
      }}>
      <Card.Title>{dateStr}</Card.Title>
        {renderActiveBadge}
        </Row>
      <Row style={{
        marginBottom: theme.spacing.md,
      }}>
        <Text>Paid by {orderData.payer.node!.username}</Text>
        {/*  TODO include payer's balance from this order*/}
      </Row>
      <View>{renderTransactions}</View>
    </Card>
      </Reanimated.View>
  );
};
