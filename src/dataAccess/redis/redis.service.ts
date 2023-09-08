import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(@Inject('REDIS_HOST') private readonly host: string, @Inject('REDIS_PORT') private readonly port: number) {
    this.redisClient = new Redis({
      host: host,
      port: port
    });
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async deleteKey(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}