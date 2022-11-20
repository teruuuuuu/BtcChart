import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rate } from '../rate';
import { OrderBook } from '../type/OrderBook'
import { PriceInfo } from '../type/PriceInfo'
import { RateHistory, RateVal } from '../type/RateHistory';

export interface OrderBookState {
    current: OrderBook | undefined;
    history: PriceInfo[];
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
    history: PriceInfo[]
}
  

export const oderBooksSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    updateOrderBook: (state, action: PayloadAction<UpdatePayload>) => {
        state.current = action.payload.current;
    },
    updateOrderBookHistory: (state, action: PayloadAction<HistoryPayload>) => {
        if(action.payload.history.length > 0) {
            const {history} = action.payload;
            state.history = history;
        }
    }
  },
});


export const { updateOrderBook, updateOrderBookHistory } = oderBooksSlice.actions

export const orderBookReducer = oderBooksSlice.reducer;