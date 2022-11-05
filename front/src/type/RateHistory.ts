

export class RateVal {
    mid: number;
    time: Date;

    constructor(mid: number, time: Date) {
        this.mid = mid;
        this.time = time;
    }
}


export class RateHistory {
    symbol: string;
    rates: RateVal[];

    constructor(symbol: string, rates: RateVal[]) {
        this.symbol = symbol;
        this.rates = rates;
    }

    timeFilter(from:Date, to:Date): RateHistory {  
        return new RateHistory(this.symbol, this.rates.filter(rate => rate.time.getTime() > from.getTime() && rate.time.getTime() < to.getTime()))
    }
}
