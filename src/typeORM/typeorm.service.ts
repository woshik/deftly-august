import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import type { ConfigType } from 'src/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService<ConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('db_host'),
      port: this.config.get('db_port'),
      database: this.config.get('db_name'),
      username: this.config.get('db_user'),
      password: this.config.get('db_password'),
      autoLoadEntities: true,
    };
  }
}
