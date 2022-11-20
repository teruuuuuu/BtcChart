import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { PriceModule } from './price.module';
import {PriceService} from './price.service';
import { TasksService } from './task.service';
import { EventsModule } from './events.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    PriceModule,
    EventsModule
  ],
  controllers: [],
  providers: [TasksService],
  exports: []
})
export class TaskModule {
  constructor() {}
}
