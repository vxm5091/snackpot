import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { RelayNode } from '@app/graphql/node/node.model';
import { Order } from '@app/graphql/order/order.model';
import { User } from '@app/graphql/user/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * NOTE: id requires a resolver because it will be transformed to a globalID for Relay compatibility
 * */
export enum EGroupFields {
  ID = 'id',
  Users = 'users',
  Orders = 'orders',
  ActiveOrder = 'activeOrder',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Group extends RelayNode {
  @Field(() => String)
  groupName: string;

  @Field(() => String, { nullable: true })
  avatarURL?: string;

  @Field(() => [User], { defaultValue: [] })
  [EGroupFields.Users]: UserEntity[];

  @Field(() => [Order], { defaultValue: [] })
  [EGroupFields.Orders]: OrderEntity[];

  @Field(() => Order, { nullable: true })
  [EGroupFields.ActiveOrder]?: OrderEntity;
}
