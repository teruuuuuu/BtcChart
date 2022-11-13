import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { OrderBook } from './orderbook';
import { PriceService } from './price.service';

const END_POINT = 'https://api.coin.z.com/public';
const PATH     = '/v1/orderbooks?symbol=BTC';

@Injectable()
export class TasksService {
    constructor(private readonly httpService: HttpService,
        private readonly priceService: PriceService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('request btc orderbook');
    this.httpService.get<any>(END_POINT + PATH).forEach(response => {
        this.priceService.insert(OrderBook.fromJson(response.data).toPriceEntity());
    })
  }
}