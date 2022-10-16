import React, { useState } from 'react';

import { OrderBook } from "./OrderBook";
import { OrderBookDataSource } from "./OrderBookDataSource";

export const MidHistroyGen = (orderBookDataSource: OrderBookDataSource) => () => {
    const [midHistory, setMidHistory] = React.useState<[number,Date][]|undefined>(undefined);

    const addMidHistory = (orderBook:OrderBook) => {
        if(midHistory) {
            const a:[number, Date][] = [[orderBook.getMid(), orderBook.responsetime]];
            const b:[number,Date][] = a.concat(midHistory).slice(0,10);
            setMidHistory(b);    
        } else {
            const a:[number, Date][] = [[orderBook.getMid(), orderBook.responsetime]];
            setMidHistory(a);
        }
        
    }

    React.useEffect(() => {
        orderBookDataSource.addListener(addMidHistory);
        return () => {orderBookDataSource.removeListener(addMidHistory)};
    });
    
    const show = (midHistory: [number,Date][]|undefined) => {
        if(!midHistory) {
            return <div></div>;
        } else {
            return <>
                <div>Mid History</div>
                <table>
                    <thead>
                        <tr><th>timestamp</th><th>mid</th></tr>
                    </thead>
                    <tbody>
                        {midHistory.map(mid => <tr><td>{mid[1].toTimeString()}</td><td>{mid[0]}</td></tr>)}
                    </tbody>
                </table>
            </>;
        }
    }
    return (
        <div>
            {show(midHistory)}
        </div>
    );
}
