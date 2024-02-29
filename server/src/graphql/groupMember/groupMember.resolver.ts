import {
  EGroupMemberField,
  GroupMember,
} from '@app/graphql/groupMember/groupMember.model';
import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => GroupMember)
export class GroupMemberResolver {
  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
}
