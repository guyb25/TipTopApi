import { Module } from '@nestjs/common';
import { SessionManagerService } from './sessionManager.service';
import { RedisModule } from '../redis/redis.module';

@Module({})
export class SessionManagerModule {
  static forRoot(redisHost: string, redisPort: number) {
    return {
      module: SessionManagerModule,
      imports: [RedisModule.forRoot(redisHost, redisPort)],
      controllers: [],
      providers: [SessionManagerService],
      exports: [SessionManagerService]
    }
  }
}