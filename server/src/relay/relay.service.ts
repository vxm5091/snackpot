import { INodeEntity } from '@app/graphql/node/types';
import {
  RelayConnection,
  RelayEdge,
  RelayPageInfo,
  TPaginationMeta,
} from '@app/relay/types';
import { Loaded } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { toGlobalId } from 'graphql-relay';
import { PaginationArgs } from './pagination.dto';

@Injectable()
export class RelayService {
  getPagingMeta(args: PaginationArgs | undefined): TPaginationMeta {
    if (!args) return { pagingType: 'none' };
    const { after, first } = args;

    if (!first) {
      return { pagingType: 'none' };
    }

    if (first < 0) {
      throw new Error('Paging limit must be positive');
    }
    return {
      pagingType: 'forward',
      after: after as string,
      first: first as number,
    };
  }

  getConnection<T extends INodeEntity>(
    entityArr: Loaded<T>[] | T[] | null,
    name: string,
    args?: TPaginationMeta,
  ): RelayConnection<T> {
    if (!entityArr) {
      return {
        edges: [],
        pageInfo: this.getPageInfo(entityArr, args),
      };
    }
    const pageInfo = this.getPageInfo(entityArr, args);
    const edges = this.getEdges(entityArr, name);

    if (args?.pagingType === 'forward' && edges.length > args.first) {
      edges.splice(args.first);
    }

    const count = edges.length;

    return {
      edges,
      pageInfo,
    };
  }

  getPageInfo(entityArr: any | null[], args?: TPaginationMeta): RelayPageInfo {
    if (!entityArr || !entityArr.length) {
      return {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: null,
        startCursor: null,
      };
    }

    const pageInfo: RelayPageInfo = {
      startCursor: entityArr[0].globalID,
      endCursor: entityArr[entityArr.length - 1].globalID,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    if (args?.pagingType === 'forward') {
      pageInfo.hasNextPage = entityArr.length > args.first;
      pageInfo.endCursor = entityArr[args.first - 1].globalID;
      if (args.after) {
        pageInfo.hasPreviousPage = true;
      }
    }
    return pageInfo;
  }

  getEdges<T extends INodeEntity>(
    entityArr: Loaded<T>[] | T[] | null,
    type: string,
  ): RelayEdge<T>[] {
    return entityArr ? entityArr.map(node => this.getEdge(node, type)) : [];
  }

  getEdge<T extends INodeEntity>(
    node: Loaded<T> | T,
    type: string,
  ): RelayEdge<T> {
    return {
      node,
      cursor: toGlobalId(type, node.id),
    };
  }
}
