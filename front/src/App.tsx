import React from 'react';
import { Provider } from 'react-redux';


import {store} from './store/Store';
import { OrderBook } from './type/OrderBook';
import { WS} from './Ws';
import { OrderBookView} from './view/OrderBookView';
import { MidHistroyView} from './view/MidHistoryView';
import { BtcChartView } from './view/BtcChartView';

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
                    <BtcChartView />
                </div>
                <div style={{display: "grid", gridTemplateRows: "auto auto"}}>
                    <OrderBookView />
                    <MidHistroyView />
                </div>
            </div>
        </Provider>
    </React.StrictMode>
}
