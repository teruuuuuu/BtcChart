import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {

    constructor(symbol: string, bid: number, ask: number, date: Date) {
        this.symbol = symbol;
        this.bid = bid;
        this.ask = ask;
        this.mid = (bid + ask) / 2;
        this.date = date;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symbol: string;

    @Column()
    bid: number;

    @Column()
    ask: number;

    @Column({type: 'real'})
    mid: number;

    @Column()
    date: Date;
}