import { RelayService } from '@app/relay/relay.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [RelayService],
  exports: [RelayService],
})
export class RelayModule {}
