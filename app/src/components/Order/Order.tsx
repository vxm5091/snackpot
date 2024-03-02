import { Card, Text } from '@rneui/themed';
import { Box } from 'components/layout/Box';
import { Row } from 'components/layout/Row';
import { Transaction } from 'components/Transaction';
import { UserAvatar } from 'components/UserAvatar';
import { Order_meData$key } from 'core/graphql/__generated__/Order_meData.graphql';
import { Order_orderData$key } from 'core/graphql/__generated__/Order_orderData.graphql';
import { format } from 'date-fns/format';
import { useMemo } from 'react';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _orderData: Order_orderData$key;
  _meData: Order_meData$key;
}

export const Order: React.FC<IProps> = ({ _orderData, _meData }) => {
  // ------------------------------------------ Data ------------------------------------------
  const orderData = useFragment(
    graphql`
      fragment Order_orderData on Order {
        id
        createdAt
        payer {
          node {
            ...UserAvatar_data
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
    () => format(orderData.createdAt, 'LLL do'),
    [orderData.createdAt],
  );

  // ------------------------------------------ Render ------------------------------------------
  const renderTransactions = useMemo(() => {
    return orderData.transactions.edges?.map((txn, i, arr) => (
      <Transaction _data={txn.node!} isLast={i === arr.length - 1} />
    ));
  }, [orderData]);

  return (
    <Card>
      <Card.Title>{`Order - ${dateStr}`}</Card.Title>
      <Card.FeaturedSubtitle>
        {orderData.group.node?.groupName || ''}
      </Card.FeaturedSubtitle>
      <Row>
        <Text>Sponsored by</Text>
        <UserAvatar _data={orderData.payer.node!} />
        {/*  TODO include payer's balance from this order*/}
      </Row>
      <Box>{renderTransactions}</Box>
    </Card>
  );
};
