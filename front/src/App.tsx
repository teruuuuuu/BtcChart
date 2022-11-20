import React, {useEffect} from 'react';
import { Provider } from 'react-redux';


import {store} from './store/Store';
import { OrderBook, OrderBookData, Price } from './type/OrderBook';
import { PriceInfo } from './type/PriceInfo';
import { WS} from './Ws';
import { BoardView} from './view/BoardView';
import { HistroyView} from './view/HistoryView';
import { ChartView } from './view/ChartView';

import {useOrdrBook, useOrdrBookHistory} from './UseOrderBook';

const SOCKET_HOST = "ws://localhost:445";
const API_HOST = "http://localhost:3000";
const PRICE_REQ_URL = API_HOST + "/price";

const ws = new WS(SOCKET_HOST);

export const App = () => {
    const [updateFunc] = useOrdrBook();
    ws.setOrderbookCallback((orderBook: OrderBook) => updateFunc(orderBook));

    const [updateHistoryFunc] = useOrdrBookHistory();

    useEffect(() => {
        const task = setInterval(() => {
            fetch(PRICE_REQ_URL, {
                method: "GET",
                // credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                res.json().then(data => {
                    updateHistoryFunc(data.map((d:any) => new PriceInfo(d.symbol, d.bid, d.ask, new Date(Date.parse(d.date)))));
                })
            });
        }, 1000);
        return () => {
            clearTimeout(task);
        };
    }, []);


    return <React.StrictMode>
        <Provider store={store}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 300px"}}>
                <div>
                    <ChartView />
                </div>
                <div style={{display: "grid", gridTemplateRows: "auto auto"}}>
                    <BoardView />
                    <HistroyView />
                </div>
            </div>
        </Provider>
    </React.StrictMode>
}
