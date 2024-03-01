import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class UpdateOrderInput {
  @Field()
  @IsString()
  id: string;
  
  @Field()
  @IsBoolean()
  isActive: boolean;
}
