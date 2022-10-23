import { Socket, connect } from "socket.io-client";
import { OrderBook } from "./type/OrderBook";

export class WS {
    uri: string;
    socket: Socket | undefined;
    orderbookCallback: ((data:OrderBook) => any) | undefined;

    constructor(uri: string) {
        this.uri = uri;
        this.socket = connect(this.uri, {
            reconnectionDelayMax: 10000,
        });

        this.socket.on("orderbook", (data:any) => {
            if(this.orderbookCallback) {
                const orderbook = OrderBook.fromJsonStr(JSON.stringify(data));
                this.orderbookCallback(orderbook);
            }
        });
    }

    setOrderbookCallback(orderbookCallback:(data: OrderBook) => any) {
        this.orderbookCallback = orderbookCallback;
    }
}
