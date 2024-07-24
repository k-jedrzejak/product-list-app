import { useCallback } from 'react';
import { useAppDispatch } from '../state/hooks';
import { updateProduct } from '../state/productSlice';
import { Product } from '../types/product';
import { API_BASE_URL } from '../constants/constants';

const useUpdateProduct = (selectedProduct: Product | null, editableProduct: Partial<Product>) => {
  const dispatch = useAppDispatch();
  const handleSave = useCallback(async (field: string) => {
    let updatedProduct: Product;

    if (field.startsWith('image')) {
      const updatedImages = [...(editableProduct.images || [])];
      updatedProduct = {
        ...selectedProduct!,
        images: updatedImages,
      };
    } else {
      updatedProduct = {
        ...selectedProduct!,
        [field]: editableProduct[field as keyof Product] ?? selectedProduct![field as keyof Product],
      };
    }

    try {
      await dispatch(updateProduct(API_BASE_URL, updatedProduct));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } 
  }, [dispatch, selectedProduct, editableProduct]);

  return {
    handleSave,
  };
};

export default useUpdateProduct;
