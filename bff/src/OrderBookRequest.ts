import request from 'request';
import { OrderBook } from './OrderBook';

const END_POINT = 'https://api.coin.z.com/public';
const PATH     = '/v1/orderbooks?symbol=BTC';

export const orderbookRequest = (callback:(orerbook: OrderBook) => any) => () => request(END_POINT + PATH, (err, response, payload) => {
    if(err) {
        console.error(`orderbook request error:${err}`)
    } else {
        const orderbook: OrderBook = OrderBook.fromJsonStr(payload);
        callback(orderbook);
        // const orderbook:any = JSON.parse(payload);
        console.log(orderbook.data.symbol);
        console.log(orderbook.data.bids);
        console.log(orderbook.data.asks);
        console.log(orderbook.getMid());
        console.log(orderbook.responsetime);
        // console.log(`mid: ${getMid(orderbook)} `);

    }
    // console.info("response+" + response);
    // console.log(JSON.stringify(JSON.parse(payload), null, 2));
});
