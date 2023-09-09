import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SessionManagerService {
    @Inject(RedisService)
    private redisService : RedisService;
    
    async createSession(user : string) : Promise<string> {
        const sessionId : string = uuidv4();
        this.redisService.setValue(sessionId, user);
        return sessionId;
    }

    async endSession(sessionId: string) : Promise<void> {
        if (await this.redisService.getValue(sessionId) === null) {
            throw new NotFoundException(`Couldn't find session id ${sessionId}`);
        }

        await this.redisService.deleteKey(sessionId);
    }

    async getSession(sessionId: string): Promise<string> {
        return await this.redisService.getValue(sessionId);
    }
}