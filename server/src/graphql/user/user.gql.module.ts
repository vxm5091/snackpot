import { UserResolver } from '@app/graphql/user/user.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserGqlModule {}
