import { useCallback, useState } from 'react';
import { useAppDispatch } from '../state/hooks';
import { updateProduct } from '../state/productSlice';
import { Product } from '../types/product';
import { API_BASE_URL } from '../constants/constants';

interface SavingState {
  [key: string]: boolean;
}

const useUpdateProduct = (selectedProduct: Product | null, editableProduct: Partial<Product>) => {
  const dispatch = useAppDispatch();
  const [savingState, setSavingState] = useState<SavingState>({});

  const handleSave = useCallback(async (field: string, index?: number) => {
    let updatedProduct: Product;

    if (field.startsWith('image')) {
      setSavingState((prev) => ({ ...prev, [`image-${index}`]: true }));

      const updatedImages = [...(editableProduct.images || [])];
      updatedProduct = {
        ...selectedProduct!,
        images: updatedImages,
      };
    } else {
      setSavingState((prev) => ({ ...prev, [field]: true }));

      updatedProduct = {
        ...selectedProduct!,
        [field]: editableProduct[field as keyof Product] ?? selectedProduct![field as keyof Product],
      };
    }

    try {
      await dispatch(updateProduct(API_BASE_URL, updatedProduct));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } finally {
      if (field.startsWith('image')) {
        setSavingState((prev) => ({ ...prev, [`image-${index}`]: false }));
      } else {
        setSavingState((prev) => ({ ...prev, [field]: false }));
      }
    }
  }, [dispatch, selectedProduct, editableProduct]);

  return {
    savingState,
    handleSave,
  };
};

export default useUpdateProduct;
