import { Badge, Card, Divider, Text, useTheme } from '@rneui/themed';
import { Row, Spacer } from 'components/layout';
import { Transaction } from 'components/Transaction';
import {
  HistoricalOrderCard_orderData$key
} from 'core/graphql/__generated__/HistoricalOrderCard_orderData.graphql';
import { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { graphql, useFragment } from 'react-relay';
import { formatDate } from 'shared/format';

interface IProps {
  _orderData: HistoricalOrderCard_orderData$key;
}

export const HistoricalOrderCard: React.FC<IProps> = ({ _orderData }) => {
  const { theme } = useTheme();

  // ------------------------------------------ Data ------------------------------------------
  const orderData = useFragment(
    graphql`
			fragment HistoricalOrderCard_orderData on Order {
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
							id
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
  
  const paidByStr = `Paid by ${orderData.payer.node!.user.node!.username}`

  // ------------------------------------------ Render ------------------------------------------
  const renderTransactions = useMemo(() => {
    return orderData.transactions.edges?.map((txn, i, arr) => (
      <Fragment key={txn.node?.id || i.toString()}>
        <Transaction _transactionData={txn.node!} role={'reader'} />
        {i < arr.length - 1 && <Spacer />}
      </Fragment>
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
          <Badge
            value={paidByStr}
            status={'success'}
          />
        </Row>
        <View>{renderTransactions}</View>
      </Card>
    </Reanimated.View>
  );
};
