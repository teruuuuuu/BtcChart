import {Rate} from './rate';

import {WebSocket} from 'ws';
import { pubRate, pubOrderBook } from './pub';
import { timerTask } from './timetask';
import { orderbookRequest } from './OrderBookRequest';

// // レート取得ようWebSocket
// const ws = new WebSocket("wss://api.coin.z.com/ws/public/v1");

// ws.on("open", () => {
//     console.log("open");
//     const message = JSON.stringify(
//     {
//         "command": "subscribe",
//         "channel": "ticker",
//         "symbol": "BTC"
//     });
//     ws.send(message);
// });

// ws.on("message", (data:any) => {
//     const jsonStr: string = data.toString();
//     const rate:Rate = JSON.parse(jsonStr);
//     pubRate(rate);
//     console.log(rate);
// });

// var request = require('request');

// import request from 'request';
import { OrderBook } from './OrderBook';

// var endPoint = 'https://api.coin.z.com/public';
// var path     = '/v1/orderbooks?symbol=BTC';

// const requestFunc = () => request(endPoint + path, (err, response, payload) => {
//     if(err) {
//         console.error(`orderbook request error:${err}`)
//     } else {
//         const orderbook: OrderBook = OrderBook.fromJsonStr(payload);
//         // const orderbook:any = JSON.parse(payload);
//         console.log(orderbook.data.symbol);
//         console.log(orderbook.data.bids);
//         console.log(orderbook.data.asks);
//         console.log(orderbook.getMid());
//         console.log(orderbook.responsetime);
//         // console.log(`mid: ${getMid(orderbook)} `);

//     }
//     // console.info("response+" + response);
//     // console.log(JSON.stringify(JSON.parse(payload), null, 2));
// });

const request = orderbookRequest((orderbook:OrderBook) => {pubOrderBook(orderbook)});


timerTask.addInterval("requestOrderBook", request, 3000);

// timerTask.addInterval("task_test", () => console.log("abc"), 1000);
// timerTask.addInterval("task_test", () => console.log("def"), 1000);

// timerTask.addInterval("clearAll", () => timerTask.clearAll(), 10000);