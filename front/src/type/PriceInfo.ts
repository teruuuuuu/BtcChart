
export class PriceInfo {

    constructor(symbol: string, bid: number, ask: number, date: Date) {
        this.symbol = symbol;
        this.bid = bid;
        this.ask = ask;
        this.mid = (bid + ask) / 2;
        this.date = date;
    }

    symbol: string;

    bid: number;

    ask: number;

    mid: number;

    date: Date;
}