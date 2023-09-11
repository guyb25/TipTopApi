import { Module } from '@nestjs/common';
import { AccountManagementModule } from './endpoints/accountManagement/accountManagement.module';
import { SurfingModule } from './endpoints/websiteSurfing/surfing.module';
import { mongoConfig, redisConfig } from './config/config';
import { LivenessModule } from './endpoints/liveness/liveness.module';

@Module({
  imports: [
    AccountManagementModule.forRoot(redisConfig.host, redisConfig.port, mongoConfig.connectionString), 
    SurfingModule.forRoot(mongoConfig.connectionString),
    LivenessModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
