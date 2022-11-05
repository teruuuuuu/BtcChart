import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';

export const BoardView = () => {
    const orderBook = useSelector((state:RootState) => state.orderbook.current);
    
    const show = (orderBook: OrderBook|undefined) => {
        if(!orderBook) {
            return <div>load...</div>;
        } else {
            return <>
                <div style={{maxWidth: "270px"}}>{orderBook.data.symbol}:{orderBook.getMid()}</div>
                <table style={{maxWidth: "270px"}}>
                    <thead>
                        <tr><th colSpan={2}>ask</th><th colSpan={2}>bid</th></tr>
                        <tr><th>price</th><th>size</th><th>price</th><th>size</th></tr>
                    </thead>
                    <tbody>
                        {orderBook.data.asks.slice().reverse().map((ask, index)  => <tr key={index}><td>{ask.price}</td><td>{ask.size}</td><td></td><td></td></tr>)}
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
