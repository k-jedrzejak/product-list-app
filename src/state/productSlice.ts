import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  cache: { [key: string]: Product }; 
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  cache: {}, 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct = state.products.find(product => product.id === action.payload) || null;
    },
    updateProductInState(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        state.products[index] = product;
      }
      state.selectedProduct = product;
      if (product.id) {
        state.cache[product.id] = product;
      }
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
      action.payload.forEach(product => {
        if (product.id) {
          state.cache[product.id] = product; 
        }
      });
    },
    setProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      state.selectedProduct = product;
      state.loading = false;
      state.error = null;
      if (product.id) {
        state.cache[product.id] = product; 
      }
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

export const fetchProducts = (url: string, signal: AbortSignal) => async (dispatch: Dispatch, getState: () => { products: ProductState }) => {
  const { products } = getState().products;

  if (products.length > 0) {
    return; // Products already fetched
  }

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

export const fetchProduct = (url: string, productId: string, signal: AbortSignal) => async (dispatch: Dispatch, getState: () => { products: ProductState }) => {
  const { cache } = getState().products;
  if (cache[productId]) {
    dispatch(setProduct(cache[productId]));
  } else {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${url}/${productId}`, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setProduct(data));
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        dispatch(setError(error.message || 'Failed to fetch product'));
      }
    }
  }
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
