
export class OrderBook {
    status: number;
    data: OrderBookData;
    responsetime: Date;

    constructor(status: number, data: OrderBookData, responsetime: Date) {
        this.status = status;
        this.data = data;
        this.responsetime =responsetime;
    }

    static fromJsonStr(jsonStr: string): OrderBook {
        const orderbook:any = JSON.parse(jsonStr);
        return new OrderBook(
            orderbook.status, 
            new OrderBookData(
                orderbook.data.bids.slice(0, 5).map((bid:any) => new Price(Number(bid.price), Number(bid.size))),
                orderbook.data.asks.slice(0, 5).map((ask:any) => new Price(Number(ask.price), Number(ask.size))),
                orderbook.data.symbol), 
            new Date(orderbook.responsetime));
    }
    getMid(): number {
        return this.data.getMid();
    }
}

export class OrderBookData {
    bids: Price[];
    asks: Price[];
    symbol: string;

    constructor(bids: Price[], asks: Price[], symbol: string) {
        this.bids = bids;
        this.asks = asks;
        this.symbol = symbol;
    }

    getMid(): number {
        if (this.asks.length > 0 && this.bids.length > 0) {
            return (this.bids[0].price as number + this.asks[0].price as number) / 2
        } else {
            return -1;
        }
    }
}

export class Price {
    price: number;
    size: number;

    constructor(price: number, size: number) {
        this.price = price;
        this.size = size;
    }
}
