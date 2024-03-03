import { useFocusEffect } from '@react-navigation/core';
import { GroupCardSkeleton } from 'components/skeleton';
import { HomeScreenQuery } from 'core/graphql/__generated__/HomeScreenQuery.graphql';
import { HomeScreen, QUERY_HomeScreen } from 'flows/screens/Home/HomeScreen';
import { Suspense, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useQueryLoader } from 'react-relay';

export const HomeScreenRoute = () => {
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
    <Suspense fallback={<GroupCardSkeleton />}>
      {queryRef && <HomeScreen _queryRef={queryRef} />}
    </Suspense>
  );
};
