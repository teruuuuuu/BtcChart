import { configureStore } from '@reduxjs/toolkit'
import orderBookSlice from '../slice/OrderBooksSlice'

export const store = configureStore({
  reducer: {
    orderbook: orderBookSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
