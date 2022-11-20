import { Price } from './price.entity';

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
        return this.fromJson(orderbook);
    }

    static fromJson(orderbook: any): OrderBook {
        return new OrderBook(
            orderbook.status, 
            new OrderBookData(
                orderbook.data.bids.slice(0, 5).map((bid:any) => new PriceVal(Number(bid.price), Number(bid.size))),
                orderbook.data.asks.slice(0, 5).map((ask:any) => new PriceVal(Number(ask.price), Number(ask.size))),
                orderbook.data.symbol), 
            new Date(orderbook.responsetime));
    }

    getMid(): number {
        return this.data.getMid();
    }

    toPriceEntity(): Price | undefined {
        if(this.data.bids.length > 0 && this.data.asks.length > 0) {
            return new Price(this.data.symbol, this.data.bids[0].price, this.data.asks[0].price, this.responsetime);
        } else {
            return undefined;
        }
        
    }
}

export class OrderBookData {
    bids: PriceVal[];
    asks: PriceVal[];
    symbol: string;

    constructor(bids: PriceVal[], asks: PriceVal[], symbol: string) {
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

export class PriceVal {
    price: number;
    size: number;

    constructor(price: number, size: number) {
        this.price = price;
        this.size = size;
    }
}
