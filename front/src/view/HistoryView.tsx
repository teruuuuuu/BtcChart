import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';
import { RateHistory, RateVal } from '../type/RateHistory';

function timeTostring(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const HistroyView = () => {
    const rateHistory = useSelector((state:RootState) => state.orderbook.history.rates.slice(-10).reverse());
    
    return (
        <div>
            <div style={{maxWidth: "270px"}}>Mid History</div>
            <table style={{maxWidth: "270px"}}>
                <thead>
                    <tr><th>timestamp</th><th>mid</th></tr>
                </thead>
                <tbody>
                    {rateHistory.map((ob, index) => <tr key={index}><td>{timeTostring(ob.time)} </td><td>{ob.mid}</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}
