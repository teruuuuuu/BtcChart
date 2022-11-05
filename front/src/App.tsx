import React from 'react';
import { Provider } from 'react-redux';


import {store} from './store/Store';
import { OrderBook } from './type/OrderBook';
import { WS} from './Ws';
import { BoardView} from './view/BoardView';
import { HistroyView} from './view/HistoryView';
import { ChartView } from './view/ChartView';

import {useOrdrBook, useOrdrBookHistory} from './UseOrderBook';

const SOCKET_HOST = "ws://localhost:445";
const ws = new WS(SOCKET_HOST);

export const App = () => {
    const [updateFunc] = useOrdrBook();
    ws.setOrderbookCallback((orderBook: OrderBook) => updateFunc(orderBook));

    const [updateHistoryFunc] = useOrdrBookHistory();
    ws.setOrderbookHistoryCallback((orderBookHistory:OrderBook[]) => updateHistoryFunc(orderBookHistory));

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
