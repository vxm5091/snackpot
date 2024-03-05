import { useNavigation } from '@react-navigation/core';
import { ListItem, useTheme, Text } from '@rneui/themed';
import { GroupAvatar } from 'components/GroupAvatar';
import { GroupBalanceCard } from 'components/GroupBalanceCard';
import { Order } from 'components/Order';
import { GroupScreenQuery } from 'core/graphql/__generated__/GroupScreenQuery.graphql';
import { TScreenPropsRoot } from 'flows/types';
import { useMemo } from 'react';
import { View } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { formatPlural } from 'shared/format/formatPlural';
import { useDidMount } from 'shared/hooks/lifecycleHooks';

export const QUERY_GroupScreen = graphql`
	query GroupScreenQuery($id: ID!) {
		group(id: $id) {
			...GroupBalanceCard_data
			...GroupAvatar_data
			groupName
			members {
				edges {
					node {
						...GroupMember_data
						id
						balance
					}
				}
			}
			orders {
				edges {
					node {
						id
						...Order_orderData
					}
				}
			}
		}
	}
`;

interface IProps {
  _queryRef: PreloadedQuery<GroupScreenQuery>;
}

export const GroupScreen: React.FC<IProps> = ({ _queryRef }) => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<TScreenPropsRoot<'GroupScreen'>['navigation']>();
  const data = usePreloadedQuery<GroupScreenQuery>(
    QUERY_GroupScreen,
    _queryRef,
  );
  const groupData = data.group;

  // ------------------------------------------ Variables ------------------------------------------
  const memberCount = useMemo(
    () => groupData.members.edges?.length || 0,
    [groupData],
  );
  const orderCount = useMemo(
    () => groupData.orders.edges?.length || 0,
    [groupData],
  );

  // ------------------------------------------ Side Effects ------------------------------------------
  useDidMount(() => {
    navigation.setOptions({
      title: groupData.groupName,
      headerShown: true,
      headerBackTitleVisible: false,
    });
  });

  // ------------------------------------------ Render ------------------------------------------
  const renderHeader = useMemo(() => {
    return (
      <ListItem>
        <GroupAvatar _data={groupData} />
        <ListItem.Content>
          <ListItem.Title
            style={{
              marginBottom: theme.spacing.xs,
            }}
          >
            {groupData.groupName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {memberCount} {formatPlural('member', memberCount)}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            {orderCount} {formatPlural('order', orderCount)}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }, [groupData, memberCount, orderCount, theme]);

  const renderOrderHistory = useMemo(() => {
    return (
      <View>
        <Text
          style={{
            marginLeft: theme.spacing.md,
            fontWeight: 'bold',
          }}
        >
          Order history
        </Text>
        {groupData.orders.edges?.map(
          order =>
            order.node && (
              <Order
                _orderData={order.node}
                key={order.node.id}
                
              />
            ),
        )}
      </View>
    );
  }, [groupData, theme]);

  return (
    <Reanimated.ScrollView
      contentContainerStyle={{
        // paddingVertical: SPACING.m1,
        paddingBottom: theme.spacing.lg,
        rowGap: theme.spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {renderHeader}
      {/*{renderMembersBalance}*/}
      <GroupBalanceCard _data={data.group} />
      {renderOrderHistory}
    </Reanimated.ScrollView>
  );
};
