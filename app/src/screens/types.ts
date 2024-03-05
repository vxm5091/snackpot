

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  MemberHistoryScreen_data$key,
} from 'core/graphql/__generated__/MemberHistoryScreen_data.graphql';

// ------------------------------------------ Root ------------------------------------------
export type TParamListRoot = {
  HomeScreen: undefined;
  GroupScreen: { id: string };
  GroupMemberHistory: {
    _data: MemberHistoryScreen_data$key;
  }
};

export type TScreenPropsRoot<T extends keyof TParamListRoot> = NativeStackScreenProps<
  TParamListRoot,
  T
>;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends TParamListRoot {}
  }
}
