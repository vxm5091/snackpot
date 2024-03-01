import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
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
}

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field()
  @IsString()
  id: string;
}
