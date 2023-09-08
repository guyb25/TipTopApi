import { Module } from '@nestjs/common';
import { SessionManagerService } from './sessionManager.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [SessionManagerService],
  exports: [SessionManagerService]
})
export class sessionManagerModule {}