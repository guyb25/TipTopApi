import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './Business/Administration/Register/register.controller';
import { LoginController } from './Business/Administration/Login/login.controller';
import { AdministrationModule } from './Business/Administration/administration.module';

@Module({
  imports: [AdministrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
