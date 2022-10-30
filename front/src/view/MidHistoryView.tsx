import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';

function timeTostring(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const MidHistroyView = () => {
    const orderBooks = useSelector((state:RootState) => state.orderbook.history.slice(0, 10));
    
    const show = (orderBooks: OrderBook[]) => {
        if(!orderBooks) {
            return <div></div>;
        } else {
            return <>
                <div style={{maxWidth: "270px"}}>Mid History</div>
                <table style={{maxWidth: "270px"}}>
                    <thead>
                        <tr><th>timestamp</th><th>mid</th></tr>
                    </thead>
                    <tbody>
                        {orderBooks.map((ob, index) => <tr key={index}><td>{timeTostring(ob.responsetime)} </td><td>{ob.getMid()}</td></tr>)}
                    </tbody>
                </table>
            </>;
        }
    }
    return (
        <div>
            {show(orderBooks)}
        </div>
    );
}
