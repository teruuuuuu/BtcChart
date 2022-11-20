import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/Store';

import {updateOrderBook, updateOrderBookHistory} from './slice/OrderBooksSlice';
import { OrderBook } from './type/OrderBook';
import { PriceInfo } from './type/PriceInfo';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<OrderBook> = useSelector;

export function useOrdrBook() {
    const dispatch = useAppDispatch();
    const updateFunc = (orderBook: OrderBook) => dispatch(updateOrderBook({current:orderBook}));
    return [updateFunc];
}

export function useOrdrBookHistory() {
    const dispatch = useAppDispatch();
    const updateFunc = (orderBookHistory: PriceInfo[]) => dispatch(updateOrderBookHistory({history:orderBookHistory}));
    return [updateFunc];
}
  
  