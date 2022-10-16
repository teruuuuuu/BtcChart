import { OrderBook } from "./OrderBook";


export class OrderBookDataSource {
    data: OrderBook | undefined;
    listeners: ((orderbook:OrderBook) => any)[];

    constructor() {
        this.listeners = [];
    }

    addListener(listener: (orderbook:OrderBook) => any) {
        this.listeners.push(listener);
    }

    removeListener(listener: (orderbook:OrderBook) => any) {
        this.listeners = this.listeners.filter(cur => cur != listener);
    }

    update(data: OrderBook) {
        this.data = data;
        this.listeners.forEach((listener) => listener(data));
    }
}