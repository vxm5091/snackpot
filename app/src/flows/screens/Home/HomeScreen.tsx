import { Divider } from '@rneui/themed';
import { GroupCard } from 'components/GroupCard';
import { useCallback } from 'react';
import Reanimated from 'react-native-reanimated';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { SPACING } from '../../../shared/design/spacing';
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
          node {
            ...GroupCard_data
          }
        }
      }
    }
  }
`;

export const HomeScreen: React.FC<IProps> = ({ _queryRef }) => {
  const data = usePreloadedQuery(QUERY_HomeScreen, _queryRef).me;

  // ------------------------------------------ Render ------------------------------------------
  const renderGroup = useCallback(
    ({ index, item: groupEdge }: { item: TGroupEdge; index: number }) => {
      if (!groupEdge.node) return null;

      return <GroupCard _data={groupEdge.node} />;
    },
    [],
  );

  const renderItemSeparator = useCallback(
    () => <Divider width={SPACING.m} />,
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
