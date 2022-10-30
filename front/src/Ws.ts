import { Socket, connect } from "socket.io-client";
import { OrderBook } from "./type/OrderBook";

export class WS {
    uri: string;
    socket: Socket | undefined;
    orderbookCallback: ((data:OrderBook) => any) | undefined;
    orderbookHistoryCallback: ((data:OrderBook[]) => any) | undefined;

    constructor(uri: string) {
        this.uri = uri;
        this.socket = connect(this.uri, {
            reconnectionDelayMax: 10000,
        });

        this.socket.on("orderbook", (data:any) => {
            if(this.orderbookCallback) {
                const orderbook = OrderBook.fromJson(data);
                this.orderbookCallback(orderbook);
            }
        });

        this.socket.on("orderbookhistory", (data:any) => {
            if(this.orderbookHistoryCallback) {
                this.orderbookHistoryCallback((data as Array<Object>).map(d => OrderBook.fromJson(d)));
            }
        });
    }

    setOrderbookCallback(orderbookCallback:(data: OrderBook) => any) {
        this.orderbookCallback = orderbookCallback;
    }

    setOrderbookHistoryCallback(orderbookHistoryCallback:(data: OrderBook[]) => any) {
        this.orderbookHistoryCallback = orderbookHistoryCallback;
    }
}
