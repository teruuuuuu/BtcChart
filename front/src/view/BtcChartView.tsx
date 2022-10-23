
import React from 'react';

import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';


export const BtcChartView = () => {
    const orderBooks = useSelector((state:RootState) => state.orderbook.data.slice(0, 10));

    return (
        <div>
            <div>Chart</div>
            <svg x={0} y={0} width={100} height={60} style={{backgroundColor: "#ddd"}}>
                <polygon points={"50 10, 70 30, 50 50, 30 30"} fill={"#99f"} />
            </svg>
        </div>
    );
}
