import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@rneui/themed';
import {
  ActiveOrderCard,
  HistoricalOrderCard,
} from 'components/OrderCard';
import { GroupBalanceCard } from 'components/BalanceCard';
import { GroupScreenQuery } from 'core/graphql/__generated__/GroupScreenQuery.graphql';
import { TScreenPropsRoot } from 'flows/types';
import { useMemo } from 'react';
import { View } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useDidMount } from 'shared/hooks/lifecycleHooks';

export const QUERY_GroupScreen = graphql`
	query GroupScreenQuery($id: ID!) {
		node(id: $id) {
			...on Group {
				...GroupBalanceCard_data
				...GroupAvatar_data
				...ActiveOrderCard_data
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
							...HistoricalOrderCard_orderData
							isActive
						}
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
  const groupData = data.node;

  // ------------------------------------------ Side Effects ------------------------------------------
  useDidMount(() => {
    navigation.setOptions({
      title: groupData?.groupName || '',
      headerShown: true,
      headerBackTitleVisible: false,
    });
  });

  // ------------------------------------------ Render ------------------------------------------
  const renderActiveOrder = useMemo(() => {
    if (!groupData) return null;
    return <ActiveOrderCard _data={groupData} context={'GroupScreen'}/>;
  }, [groupData]);

  const renderOrderHistory = useMemo(() => {
    return (
      <View>
        {groupData?.orders?.edges?.map(
          order =>
            order.node && !order.node.isActive && (
              <HistoricalOrderCard
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
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        // paddingVertical: SPACING.m1,
        paddingTop: 0,
        paddingBottom: theme.spacing.lg,
        rowGap: theme.spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {groupData && <GroupBalanceCard _data={groupData} />}
      {renderActiveOrder}
      {renderOrderHistory}
    </Reanimated.ScrollView>
  );
};
