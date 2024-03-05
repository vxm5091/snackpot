import { Divider, useTheme } from '@rneui/themed';
import { ActiveOrderCard } from 'components/OrderCard';
import { Spacer } from 'components/layout';
import { sharedStyles } from 'components/styles';
import { useCallback } from 'react';
import Reanimated from 'react-native-reanimated';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import {
  HomeScreenQuery,
  HomeScreenQuery$data,
} from 'core/graphql/__generated__/HomeScreenQuery.graphql';

interface IProps {
  _queryRef: PreloadedQuery<HomeScreenQuery>;
}

type TGroupEdge = NonNullable<
  HomeScreenQuery$data['me']['groups']['edges']
>[number];

export const QUERY_HomeScreen = graphql`
  query HomeScreenQuery {
    me {
      ...UserAvatar_data
      groups {
        edges {
          node @required(action: THROW) {
            id
            group {
              node @required(action: THROW) {
                ...ActiveOrderCard_data
              }
            }
          }
        }
      }
    }
  }
`;

export const HomeScreen: React.FC<IProps> = ({ _queryRef }) => {
  const { theme } = useTheme();
  const data = usePreloadedQuery(QUERY_HomeScreen, _queryRef).me;

  // ------------------------------------------ Render ------------------------------------------
  const renderGroup = useCallback(
    ({ item: groupMemberEdge, index }: { item: TGroupEdge; index: number }) => {
      return (
        <ActiveOrderCard
          _data={groupMemberEdge.node.group.node}
          key={groupMemberEdge.node.id}
          context={'HomeScreen'}
        />
      );
    },
    [],
  );

  const renderItemSeparator = useCallback(() => <Spacer />, []);

  return (
    <Reanimated.FlatList
      data={data.groups.edges}
      renderItem={renderGroup}
      contentContainerStyle={sharedStyles.scrollviewContainer}
      ItemSeparatorComponent={renderItemSeparator}
      automaticallyAdjustKeyboardInsets={true}
      keyboardDismissMode={'on-drag'}
      keyboardShouldPersistTaps={'handled'}
    />
  );
};
