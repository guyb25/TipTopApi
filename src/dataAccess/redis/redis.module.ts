import { Module, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot(host: string, port: number): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisService,
        {
          provide: 'REDIS_HOST',
          useValue: host,
        },
        {
          provide: 'REDIS_PORT',
          useValue: port
        }
      ],
      exports: [RedisService]
    }
  }
}