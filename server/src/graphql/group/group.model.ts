import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { GroupMember } from '@app/graphql/groupMember/groupMember.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { Order } from '@app/graphql/order/order.model';
import { User } from '@app/graphql/user/user.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EGroupField {
  GlobalID = 'globalID',
  Members = 'members',
  Owner = 'owner',
  Orders = 'orders',
  ActiveOrder = 'activeOrder',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Group extends BaseNode {
  @Field(() => String)
  groupName: string;

  @Field(() => String, { nullable: true })
  avatarURL?: string;

  @Field(() => ID)
  [EGroupField.GlobalID]: string;

  @Field(() => [GroupMember], { defaultValue: [] })
  [EGroupField.Members]: GroupMember;

  @Field(() => User)
  [EGroupField.Owner]: UserEntity;

  @Field(() => [Order], { defaultValue: [] })
  [EGroupField.Orders]: OrderEntity[];

  @Field(() => Order, { nullable: true })
  [EGroupField.ActiveOrder]?: OrderEntity;
}
