import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';

export enum ENavigators {
  Root = 'Root',
  Tab = 'Tab',
  Home = 'Home',
}

// ------------------------------------------ Root ------------------------------------------
export type TParamListRoot = {
  Tabs: NavigatorScreenParams<TParamListTabs>;
  GroupScreen: { id: string };
};

export type TScreenPropsRoot<T extends keyof TParamListRoot> = StackScreenProps<
  TParamListRoot,
  T,
  ENavigators.Tab
>;

// ------------------------------------------ Tab Navigator ------------------------------------------
export type TParamListTabs = {
  HomeTab: NavigatorScreenParams<TParamListHome>;
};

export type TScreenPropsTab<T extends keyof TParamListTabs> =
  CompositeScreenProps<
    BottomTabScreenProps<TParamListTabs, T, ENavigators.Tab>,
    TScreenPropsRoot<keyof TParamListRoot>
  >;

// ------------------------------------------ Home Tab ------------------------------------------
export type TParamListHome = {
  HomeScreen: undefined;
};

export type TScreenPropsHome<T extends keyof TParamListHome> =
  CompositeScreenProps<
    StackScreenProps<TParamListHome, T, ENavigators.Home>,
    TScreenPropsTab<keyof TParamListTabs>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TParamListRoot {}
  }
}
