import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { PriceModule } from './price.module';
import {PriceService} from './price.service';
import { TasksService } from './task.service';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    PriceModule
  ],
  controllers: [],
  providers: [TasksService],
  exports: []
})
export class TaskModule {
  constructor() {}
}
