export class Rate {
    channel: string;
    ask: number;
    bid: number;
    high: number;
    last: number;
    low: number;
    symbol: string;
    timestamp: string;
    volume: number;

    constructor(channel: string, ask: number, bid: number, high: number, last: number, low: number, symbol: string, timestamp: string, volume: number) {
        this.channel = channel;
        this.ask = ask;
        this.bid = bid;
        this.high = high;
        this.last = last;
        this.low = low;
        this.symbol = symbol;
        this.timestamp = timestamp;
        this.volume = volume;
    }
}