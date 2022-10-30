import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderBook } from '../type/OrderBook'

export interface OrderBookState {
    current: OrderBook | undefined;
    history: Array<OrderBook>;
    maxSize: number;
}
  
const initialState: OrderBookState = {
    current: undefined,
    history: [],
    maxSize: 3600,
};

type UpdatePayload = {
    current: OrderBook
}

type HistoryPayload = {
    history: OrderBook[]
}
  

export const oderBooksSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    updateOrderBook: (state, action: PayloadAction<UpdatePayload>) => {
        state.current = action.payload.current;
    },
    updateOrderBookHistory: (state, action: PayloadAction<HistoryPayload>) => {
        state.history = action.payload.history;
    }
  },
});


export const { updateOrderBook, updateOrderBookHistory } = oderBooksSlice.actions

export const orderBookReducer = oderBooksSlice.reducer;