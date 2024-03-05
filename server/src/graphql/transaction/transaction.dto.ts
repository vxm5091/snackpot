import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
class BaseTransactionInput {
  @Field()
  @IsString()
  itemName: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  itemPrice?: number;
}

@InputType()
export class CreateTransactionInput extends BaseTransactionInput {
  @Field(() => ID)
  @IsString()
  orderID: string;

  @Field(() => ID)
  @IsString()
  groupMemberID: string;
}

@InputType()
export class UpdateTransactionInput extends PartialType(BaseTransactionInput) {
  @Field()
  @IsString()
  id: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  itemPrice: number;
}

@InputType()
export class UpdateTransactionsManyInput {
  @Field(() => [UpdateTransactionInput])
  transactions: UpdateTransactionInput[];
}
