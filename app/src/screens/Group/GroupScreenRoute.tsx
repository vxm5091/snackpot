import { useFocusEffect } from '@react-navigation/core';
import { CustomSkeleton } from 'components/skeleton';
import { GroupScreenQuery } from 'core/graphql/__generated__/GroupScreenQuery.graphql';
import {
  GroupScreen,
  QUERY_GroupScreen,
} from './GroupScreen';
import { TScreenPropsRoot } from '../types';
import { Suspense, useCallback } from 'react';
import { useQueryLoader } from 'react-relay';

const GroupScreenRoute: React.FC<TScreenPropsRoot<'GroupScreen'>> = ({
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
    <Suspense fallback={<CustomSkeleton />}>
      {queryRef && <GroupScreen _queryRef={queryRef} />}
    </Suspense>
  );
};

export default GroupScreenRoute;
