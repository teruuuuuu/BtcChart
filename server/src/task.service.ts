import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { OrderBook } from './orderbook';
import { PriceService } from './price.service';
import { EventsGateway } from './events.gateway';

const END_POINT = 'https://api.coin.z.com/public';
const PATH     = '/v1/orderbooks?symbol=BTC';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    @Inject(EventsGateway)
    private readonly eventsGateway: EventsGateway;


    constructor(private readonly httpService: HttpService,
        private readonly priceService: PriceService) {
            this.logger.debug("TasksService start");
        }

  @Cron('* * * * * *')
  handleCron() {
    // this.logger.debug('request btc orderbook');
    this.httpService.get<any>(END_POINT + PATH).forEach(response => {
        const orderbook: OrderBook = OrderBook.fromJson(response.data);
        this.priceService.insert(orderbook.toPriceEntity());
        this.eventsGateway.sendOrderBook(orderbook);
    })
  }
}