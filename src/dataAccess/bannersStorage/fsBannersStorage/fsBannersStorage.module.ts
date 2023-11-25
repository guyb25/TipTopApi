import { Module, DynamicModule } from '@nestjs/common';
import { FsBannersStorageService } from './fsBannersStorage.service';

@Module({})
export class FsBannersStorageModule {
  static forRoot(bannersDir: string): DynamicModule {
    return {
      module: FsBannersStorageModule,
      imports: [],
      controllers: [],
      providers: [
        {
          provide: 'BannersStorage',
          useClass: FsBannersStorageService,
        },
        {
          provide: 'BANNERS_DIR',
          useValue: bannersDir
        }
    ],
      exports: ['BannersStorage'],
    };
  }
}
