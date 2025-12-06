import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from './acces-token.strategy';

@Module({
  providers: [AccessTokenStrategy],
})
export class TokenStrategyModule {}
