import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rate } from '../rate';
import { OrderBook } from '../type/OrderBook'
import { RateHistory, RateVal } from '../type/RateHistory';

export interface OrderBookState {
    current: OrderBook | undefined;
    history: RateHistory;
    maxSize: number;
}
  
const initialState: OrderBookState = {
    current: undefined,
    history: new RateHistory("", []),
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
        if(action.payload.history.length > 0) {
            const {history} = action.payload;
            state.history = new RateHistory(history[0].data.symbol, history.map(d => new RateVal(d.getMid(), d.responsetime)));
        }
    }
  },
});


export const { updateOrderBook, updateOrderBookHistory } = oderBooksSlice.actions

export const orderBookReducer = oderBooksSlice.reducer;