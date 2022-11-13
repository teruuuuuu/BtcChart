import {Price} from './price.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DataConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Price],
  synchronize: true,
};