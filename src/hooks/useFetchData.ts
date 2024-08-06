import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from '../state/store';
import { fetchProducts, fetchProduct } from '../state/productSlice';
import { API_BASE_URL } from '../constants/constants';

const useProductData = (productId?: string) => {
  const dispatch = useAppDispatch();
  const {
    products,
    selectedProduct,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (productId) {
      if (!selectedProduct || selectedProduct.id !== productId) {
        dispatch(fetchProduct(API_BASE_URL, productId, signal ));
      }
    } else if (products.length === 0) {
      dispatch(fetchProducts(API_BASE_URL, signal ));
    }

    return () => {
      controller.abort();
    };
  }, [dispatch, productId, selectedProduct, products.length]);

  return {
    products,
    selectedProduct,
    loading,
    error,
  };
};

export default useProductData;
