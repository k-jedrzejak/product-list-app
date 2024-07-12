// productSlice.ts

import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct = state.products.find(product => product.name === action.payload) || null;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(product => product.name === action.payload.name);
      if (index !== -1) {
        state.products = [
          ...state.products.slice(0, index),
          action.payload,
          ...state.products.slice(index + 1)
        ];
      }
    },    
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { selectProduct, updateProduct, setProducts, setLoading, setError } = productSlice.actions;

export const fetchProducts = (url: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data",data);
    dispatch(setProducts(data));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch products'));
  }
};

export default productSlice.reducer;
