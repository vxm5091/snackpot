import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { fromGlobalId } from 'graphql-relay/node/node';

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
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
  orderID: string;

  @Field(() => ID)
  @IsString()
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
  groupMemberID: string;
}

@InputType()
export class UpdateTransactionInput extends PartialType(BaseTransactionInput) {
  @Field()
  @IsString()
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
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

@InputType()
export class DeleteTransactionInput {
  @Field(() => ID)
  @IsString()
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
  orderID: string;

  @Field(() => ID)
  @IsString()
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
  groupMemberID: string;
}
