import configuration from './config';
import configValidation from './config/config.validation';
import { Module } from '@nestjs/common';
import { FieldsModule } from './api/fields/fields.module';
import { AreasModule } from './api/areas/areas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeORM/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema: configValidation,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule],
    }),
    FieldsModule,
    AreasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
