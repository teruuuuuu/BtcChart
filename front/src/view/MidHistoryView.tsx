import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';

export const MidHistroyView = () => {
    const orderBooks = useSelector((state:RootState) => state.orderbook.data.slice(0, 10));
    
    const show = (orderBooks: OrderBook[]) => {
        if(!orderBooks) {
            return <div></div>;
        } else {
            return <>
                <div>Mid History</div>
                <table>
                    <thead>
                        <tr><th>timestamp</th><th>mid</th></tr>
                    </thead>
                    <tbody>
                        {orderBooks.map((ob, index) => <tr key={index}><td>{ob.responsetime.toTimeString()}</td><td>{ob.getMid()}</td></tr>)}
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
