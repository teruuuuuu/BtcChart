import React, { useState } from 'react';

import { OrderBook } from "./OrderBook";
import { OrderBookDataSource } from "./OrderBookDataSource";

export const OrderBookViewGen = (orderBookDataSource: OrderBookDataSource) => () => {
    const [orderBook, setOrderBook] = React.useState<OrderBook|undefined>(undefined);
    
    React.useEffect(() => {
        orderBookDataSource.addListener(setOrderBook);
        return () => {orderBookDataSource.removeListener(setOrderBook)};
    });
    
    const show = (orderBook: OrderBook|undefined) => {
        if(!orderBook) {
            return <div>load...</div>;
        } else {
            return <>
                <div>{orderBook.data.symbol}:{orderBook.getMid()}</div>
                <table>
                    <thead>
                        <tr><th colSpan={2}>ask</th><th colSpan={2}>bid</th></tr>
                        <tr><th>price</th><th>size</th><th>price</th><th>size</th></tr>
                    </thead>
                    <tbody>
                        {orderBook.data.asks.reverse().map((ask, index)  => <tr key={index}><td>{ask.price}</td><td>{ask.size}</td><td></td><td></td></tr>)}
                        {orderBook.data.bids.map((bid, index) => <tr key={index}><td></td><td></td><td>{bid.price}</td><td>{bid.size}</td></tr>)}
                    </tbody>
                </table>
            </>;
        }
    }
    return (
        <div>
            {show(orderBook)}
        </div>
    );
}
