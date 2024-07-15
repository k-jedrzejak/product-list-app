/* eslint-disable @typescript-eslint/no-explicit-any */
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
      state.selectedProduct = state.products.find(product => product.id === action.payload) || null;
    },
    updateProductInState(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.selectedProduct = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
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

export const { selectProduct, updateProductInState, setProducts, setProduct, setLoading, setError } = productSlice.actions;

export const fetchProducts = (url: string, signal: AbortSignal) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(url, { signal }); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      dispatch(setError(error.message || 'Failed to fetch products'));
    }
  }
};

export const fetchProduct = (url: string, productId: string, signal: AbortSignal) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${url}/${productId}`, {signal});
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setProduct(data));
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      dispatch(setError(error.message || 'Failed to fetch product'));
    }  }
};

export const updateProduct = (url: string, product: Product) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${url}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(updateProductInState(data));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to update product'));
  }
};

export default productSlice.reducer;
