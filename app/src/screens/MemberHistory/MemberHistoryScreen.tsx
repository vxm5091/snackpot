import { Card, Text, useTheme } from '@rneui/themed';
import { BalanceText } from 'components/BalanceText';
import { Row, Spacer, Stack } from 'components/layout';
import { MemberRowUI } from 'components/MemberRowUI';
import { UserAvatar } from 'components/UserAvatar';
import { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { graphql, useFragment } from 'react-relay';
import { TScreenPropsRoot } from 'screens/types';
import { formatCurrency } from 'shared/format';
import { useDidMount } from 'shared/hooks/lifecycleHooks';

const MemberHistoryScreen: React.FC<TScreenPropsRoot<'GroupMemberHistory'>> = ({
  route,
  navigation,
}) => {
  const { theme } = useTheme();

  const data = useFragment(
    graphql`
      fragment MemberHistoryScreen_data on GroupMember {
        id
        balance
        user {
          node @required(action: THROW) {
            username
          }
        }
        group {
          node @required(action: THROW) {
            groupName
          }
        }
        transactions {
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
                      username
                    }
                  }
                }
              }
              order {
                node @required(action: THROW) {
                  createdAt
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
          }
        }
      }
    `,
    route.params._data,
  );

  // ------------------------------------------ Variables ------------------------------------------
  const paid = useMemo(() => {
    return (
      data.transactions.edges?.filter(
        edge =>
          edge.node.order.node.payer.node.id === data.id && edge.node.itemPrice,
      ) || []
    );
  }, [data]);

  const paidTotal = useMemo(() => {
    return paid.reduce((acc, { node: txn }) => acc + txn.itemPrice!, 0);
  }, [paid]);

  const received = useMemo(() => {
    return (
      data.transactions.edges?.filter(
        edge => edge.node.recipient.node.id === data.id && edge.node.itemPrice,
      ) || []
    );
  }, [data]);

  const receivedTotal = useMemo(() => {
    return received.reduce((acc, { node: txn }) => acc + txn.itemPrice!, 0);
  }, [received]);

  // ------------------------------------------ Side Effects ------------------------------------------
  useDidMount(() => {
    const groupName = data.group.node.groupName;
    const username = data.user.node.username;
    navigation.setOptions({
      title: `${groupName} / ${username}`,
    });
  });

  // ------------------------------------------ Render ------------------------------------------
  const renderPaidCard = () => {
    return (
      <Reanimated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Card key={'card-paid'}>
          <View>
            <Card.Title>
              {'Paid · '}
              <Card.Title
                style={{
                  color: theme.colors.primary,
                }}
              >
                {formatCurrency(paidTotal)}
              </Card.Title>
            </Card.Title>
          </View>
          <Stack spacing={'xs'}>
            {paid.map(({ node: txn }, i, arr) => (
              <Fragment key={`${txn.id || i}-paid`}>
                <MemberRowUI
                  amount={txn.itemPrice!}
                  username={txn.recipient.node.user.node.username}
                  timestamp={txn.order.node.createdAt}
                  description={txn.itemName}
                />
                <Spacer />
              </Fragment>
            ))}
          </Stack>
        </Card>
      </Reanimated.View>
    );
  };

  const renderReceivedCard = () => {
    return (
      <Reanimated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Card key={'card-received'}>
          <View>
            <Card.Title>
              {'Received · '}
              <Card.Title
                style={{
                  color: theme.colors.secondary,
                }}
              >
                {formatCurrency(receivedTotal)}
              </Card.Title>
            </Card.Title>
          </View>
          <Stack spacing={'xs'}>
            {received.map(({ node: txn }, i, arr) => (
              <Fragment key={`${txn.id || i}-received`}>
                <MemberRowUI
                  amount={-txn.itemPrice!}
                  username={txn.order.node.payer.node.user.node.username}
                  timestamp={txn.order.node.createdAt}
                  description={txn.itemName}
                />
                <Spacer />
              </Fragment>
            ))}
          </Stack>
        </Card>
      </Reanimated.View>
    );
  };

  return (
    <Reanimated.ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
        rowGap: theme.spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingLeft: theme.spacing.md,
        }}
      >
        <Text h4>
          {'Group balance · '}
          <BalanceText amount={data.balance} h4 />
        </Text>
      </View>
      {renderPaidCard()}
      {renderReceivedCard()}
    </Reanimated.ScrollView>
  );
};

export default MemberHistoryScreen;
