import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/Store';

import {updateOrderBook} from './slice/OrderBooksSlice';
import { OrderBook } from './type/OrderBook';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<OrderBook> = useSelector;

export function useOrdrBook() {
    const dispatch = useAppDispatch();
    const updateFunc = (orderBook: OrderBook) => dispatch(updateOrderBook({data:orderBook}));
    return [updateFunc];
}
  