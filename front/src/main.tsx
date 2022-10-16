// import React, { useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './style.css';


import { OrderBookDataSource } from './OrderBookDataSource';
import { OrderBook } from './OrderBook';
import { WS} from './Ws';
import { OrderBookViewGen} from './OrderBookView';
import { MidHistroyGen} from './MidHistoryView';

const SOCKET_HOST = "ws://localhost:445";
const ws = new WS(SOCKET_HOST);
const orderBookDataSource: OrderBookDataSource = new OrderBookDataSource();
ws.setOrderbookCallback((orderBook: OrderBook) => orderBookDataSource.update(orderBook));
const OrderBookView = OrderBookViewGen(orderBookDataSource);
const MidHistoryView = MidHistroyGen(orderBookDataSource);

const Root = () => {
    return <div>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            <OrderBookView />
            <MidHistoryView />
        </div>
    </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('app')!);
root.render(<Root />);

