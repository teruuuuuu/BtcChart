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
    }
});
