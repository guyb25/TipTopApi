import { Module } from '@nestjs/common';
import { LivenessController } from './liveness.controller';
@Module({
  imports: [],
  controllers: [LivenessController],
  providers: []
})
export class LivenessModule {}
