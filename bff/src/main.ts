import {Rate} from './rate';

import {WebSocket} from 'ws';
import { pubRate, pubOrderBook, pubOrderBookHistory } from './pub';
import { timerTask } from './timetask';
import { orderbookRequest } from './OrderBookRequest';

import { OrderBook } from './OrderBook';

let orderBookHistory: OrderBook[] = [];
const request = orderbookRequest((orderbook:OrderBook) => {
    orderBookHistory = orderBookHistory.concat(orderbook).slice(Math.max(orderBookHistory.length - 3659, 0));
    pubOrderBook(orderbook);
    pubOrderBookHistory(orderBookHistory);
});


timerTask.addInterval("requestOrderBook", request, 3000);