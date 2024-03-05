import { Badge, Card, Divider, Text, useTheme } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { Transaction } from 'components/Transaction';
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
}

export const Order: React.FC<IProps> = ({ _orderData }) => {
  const { theme } = useTheme();

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

  // ------------------------------------------ Variables ------------------------------------------
  const dateStr = useMemo(
    () => formatDate(orderData.createdAt),
    [orderData.createdAt],
  );

  // ------------------------------------------ Render ------------------------------------------
  const renderTransactions = useMemo(() => {
    return orderData.transactions.edges?.map((txn, i, arr) => (
      <>
        <Transaction _transactionData={txn.node!} key={i} role={'reader'} />
        {i < arr.length - 1 && <Divider />}
      </>
    ));
  }, [orderData]);


  const renderActiveBadge = useMemo(() => {
    if (!orderData.isActive) return null;
    return <Badge status={'primary'} value={'Active'} />;
  }, [orderData]);

  return (
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
        <Row
          style={{
            columnGap: theme.spacing.sm,
          }}
        >
          <Card.Title>{dateStr}</Card.Title>
          {renderActiveBadge}
        </Row>
        <Row
          style={{
            marginBottom: theme.spacing.md,
          }}
        >
          <Text>Paid by {orderData.payer.node!.user.node!.username}</Text>
          {/*  TODO include payer's balance from this order*/}
        </Row>
        <View>{renderTransactions}</View>
      </Card>
    </Reanimated.View>
  );
};
