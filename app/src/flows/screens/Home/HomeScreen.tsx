import { Divider, useTheme } from '@rneui/themed';
import { ActiveOrderCard } from 'components/ActiveOrderCard';
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

type TGroupEdge = TNonNullable<
  HomeScreenQuery$data['me']['groups']['edges']
>[number];

export const QUERY_HomeScreen = graphql`
	query HomeScreenQuery {
		me {
			...UserAvatar_data
			groups {
				edges {
					node @required(action: THROW) {
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
  const {theme} = useTheme();
  const data = usePreloadedQuery(QUERY_HomeScreen, _queryRef).me;

  // ------------------------------------------ Render ------------------------------------------
  const renderGroup = useCallback(
    ({ item: groupMemberEdge, index }: { item: TGroupEdge; index: number }) => {
      return <ActiveOrderCard _data={groupMemberEdge.node.group.node} key={groupMemberEdge.id}/>;
    },
    [],
  );

  const renderItemSeparator = useCallback(
    () => <Divider width={theme.spacing.md} />,
    [],
  );

  return (
    <Reanimated.FlatList
      data={data.groups.edges}
      renderItem={renderGroup}
      ItemSeparatorComponent={renderItemSeparator}
    />
  );
};
