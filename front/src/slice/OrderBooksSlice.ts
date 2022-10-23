import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderBook } from '../type/OrderBook'

export interface OrderBookState {
    data: Array<OrderBook>;
    maxSize: number;
}
  
const initialState: OrderBookState = {
    data: [],
    maxSize: 1000,
};

type UpdatePayload = {
    data: OrderBook
}
  

export const oderBooksSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    updateOrderBook: (state, action: PayloadAction<UpdatePayload>) => {
        state.data = [action.payload.data].concat(state.data).slice(0, state.maxSize);
        console.info(state.data);
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateOrderBook } = oderBooksSlice.actions

export default oderBooksSlice.reducer