import { useFocusEffect } from '@react-navigation/core';
import { GroupCardSkeleton } from 'components/skeleton';
import { GroupScreenQuery } from 'core/graphql/__generated__/GroupScreenQuery.graphql';
import {
  GroupScreen,
  QUERY_GroupScreen,
} from 'flows/screens/Group/GroupScreen';
import { TScreenPropsRoot } from 'flows/types';
import { Suspense, useCallback } from 'react';
import { useQueryLoader } from 'react-relay';

export const GroupScreenRoute: React.FC<TScreenPropsRoot<'GroupScreen'>> = ({
  route,
}) => {
  const [queryRef, loadQuery] =
    useQueryLoader<GroupScreenQuery>(QUERY_GroupScreen);

  // ------------------------------------------ Side Effects ------------------------------------------
  useFocusEffect(
    useCallback(() => {
      loadQuery({ id: route.params.id }, { fetchPolicy: 'store-and-network' });
    }, [loadQuery]),
  );

  // ------------------------------------------ Render ------------------------------------------
  return (
    <Suspense fallback={<GroupCardSkeleton />}>
      {queryRef && <GroupScreen _queryRef={queryRef} />}
    </Suspense>
  );
};
