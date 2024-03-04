import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsString()
  itemName: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  itemPrice?: number;
  
  @Field(() => ID)
  @IsString()
  orderID: string;
  
  @Field(() => ID)
  @IsString()
  groupMemberID: string;
}

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field()
  @IsString()
  id: string;
}

@InputType()
export class UpdateTransactionsManyInput {
  @Field(() => [UpdateTransactionInput])
  transactions: UpdateTransactionInput[];
}
