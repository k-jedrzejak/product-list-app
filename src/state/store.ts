import { configureStore } from '@reduxjs/toolkit';
import productReducer, { ProductState as ProductStateSlice } from './productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ProductState = ProductStateSlice; 

export default store;
