import React, {useEffect} from 'react';
import { Provider } from 'react-redux';


import {store} from './store/Store';
import { OrderBook, OrderBookData, Price } from './type/OrderBook';
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
                    const orderbooks = data.map((d:any) => new OrderBook(0, new OrderBookData([new Price(d.bid, 1)],[new Price(d.ask, 1)], d.symbol), new Date(Date.parse(d.date))));
                    updateHistoryFunc(orderbooks);
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
