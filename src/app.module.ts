import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { accountManagementModule } from './endpoints/accountManagement/accountManagement.module';
import { surfingModule } from './endpoints/websiteSurfing/surfingModule.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [accountManagementModule, surfingModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }],
})
export class AppModule {}
