import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @Field()
  @IsString()
  groupName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatarURL?: string;

  @Field(() => [ID])
  @IsArray()
  usersID: string[];
}

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field()
  id: string;
}
