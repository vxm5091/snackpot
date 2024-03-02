import { RelayNode } from '@app/graphql/node/node.model';
import Relay from 'graphql-relay';

export type RelayEdge<T extends RelayNode> = Relay.Edge<T>;

export type RelayPageInfo = Relay.PageInfo;

export interface RelayConnection<T extends RelayNode>
  extends Relay.Connection<T> {}

export type TPaginationMeta =
  | {
      pagingType: 'forward';
      after?: string;
      first: number;
    }
  | { pagingType: 'none' };
