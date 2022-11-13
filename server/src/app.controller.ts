import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Price } from './price.entity';
import { PriceService } from './price.service';
import { currentDateTime, minutesAGo} from './date.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly priceService: PriceService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/price")
  async getPrice(): Promise<Price[]> {
    return this.priceService.between(minutesAGo(60), currentDateTime());
  }


}
