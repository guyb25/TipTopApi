import { Module, DynamicModule } from '@nestjs/common';
import { SessionManagerService } from './sessionManager.service';
import { RedisModule } from '../redis/redis.module';

@Module({})
export class SessionManagerModule {
  static forRoot(redisHost: string, redisPort: number): DynamicModule {
    return {
      module: SessionManagerModule,
      imports: [RedisModule.forRoot(redisHost, redisPort)],
      controllers: [],
      providers: [SessionManagerService],
      exports: [SessionManagerService]
    }
  }
}