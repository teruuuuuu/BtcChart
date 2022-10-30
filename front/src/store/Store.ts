import { configureStore } from '@reduxjs/toolkit'
import {orderBookReducer} from '../slice/OrderBooksSlice'

export const store = configureStore({
  reducer: {
    orderbook: orderBookReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
