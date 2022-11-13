import { DataSource } from 'typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataConfig } from './database.source';
import { EventsModule } from './events.module';
import { PriceService } from './price.service';
import { PriceModule } from './price.module';
import { TaskModule } from './task.module';

import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({...DataConfig}),
    // EventsModule,
    PriceModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService, PriceService, EventsGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
