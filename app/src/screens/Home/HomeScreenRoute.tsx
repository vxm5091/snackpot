import { useFocusEffect } from '@react-navigation/core';
import { CustomSkeleton } from 'components/skeleton';
import { HomeScreenQuery } from 'core/graphql/__generated__/HomeScreenQuery.graphql';
import { HomeScreen, QUERY_HomeScreen } from './HomeScreen';
import { Suspense, useCallback } from 'react';
import { useQueryLoader } from 'react-relay';

const HomeScreenRoute = () => {
  const [queryRef, loadQuery] =
    useQueryLoader<HomeScreenQuery>(QUERY_HomeScreen);

  // ------------------------------------------ Side Effects ------------------------------------------
  useFocusEffect(
    useCallback(() => {
      loadQuery({}, { fetchPolicy: 'store-and-network' });
    }, [loadQuery]),
  );

  // ------------------------------------------ Render ------------------------------------------
  return (
    <Suspense fallback={<CustomSkeleton />}>
      {queryRef && <HomeScreen _queryRef={queryRef} />}
    </Suspense>
  );
};

export default HomeScreenRoute