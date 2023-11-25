import { Module } from '@nestjs/common';
import { AccountManagementModule } from './endpoints/accountManagement/accountManagement.module';
import { SurfingModule } from './endpoints/websiteSurfing/surfing.module';
import { fsBannersConfig, mongoConfig, redisConfig } from './static/config';
import { LivenessModule } from './endpoints/liveness/liveness.module';

@Module({
  imports: [
    AccountManagementModule.forRoot(
      redisConfig.host,
      redisConfig.port,
      mongoConfig.connectionString,
      fsBannersConfig.path
    ),
    SurfingModule.forRoot(
      mongoConfig.connectionString,
      mongoConfig.connectionString,
    ),
    LivenessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
