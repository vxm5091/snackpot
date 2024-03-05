import {
  UpdateTransactionInput
} from '@app/graphql/transaction/transaction.dto';
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { fromGlobalId } from 'graphql-relay/node/node';

@InputType()
export class UpdateOrderInput {
  @Field()
  @IsString()
  @Transform(({ value }) => (value ? fromGlobalId(value).id : null))
  id: string;
  
  @Field()
  @IsBoolean()
  isActive: boolean;
}
