import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchProduct, updateProduct } from '../state/productSlice';
import { RootState } from '../state/store';
import { Product } from '../types/product';
import { API_BASE_URL } from '../constants/constants';

export const useProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector((state: RootState) => state.products);
  const [editableProduct, setEditableProduct] = useState<Partial<Product>>({});
  const [savingState, setSavingState] = useState<{ [key: string]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (productId && (!selectedProduct || selectedProduct.id !== productId)) {
      dispatch(fetchProduct(API_BASE_URL, productId, signal));
    }

    return () => {
      controller.abort();
    };
  }, [dispatch, productId, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      const { name, description, number, images } = selectedProduct;
      setEditableProduct({ name, description, number, images });
      setSavingState({});
      setImageErrors(Array(images.length).fill(''));
    }
  }, [selectedProduct]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProduct((prev) => {
      if (name.startsWith('url-') || name.startsWith('name-')) {
        const [field, index] = name.split('-');
        const updatedImages = [...(prev.images || [])];
        updatedImages[+index] = { ...updatedImages[+index], [field]: value };
        return { ...prev, images: updatedImages };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const handleSaveField = useCallback(async (field: keyof Product) => {
    setSavingState((prev) => ({ ...prev, [field]: true }));

    const updatedProduct = {
      ...selectedProduct!,
      [field]: editableProduct[field] as Product[keyof Product],
    };

    try {
      await dispatch(updateProduct(API_BASE_URL, updatedProduct));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } finally {
      setSavingState((prev) => ({ ...prev, [field]: false }));
    }
  }, [dispatch, selectedProduct, editableProduct]);

  const handleSaveImageField = useCallback(async (index: number) => {
    setSavingState((prev) => ({ ...prev, [`image-${index}`]: true }));

    const updatedImages = [...(editableProduct.images || [])];
    try {
      const updatedProduct: Product = {
        ...selectedProduct!,
        images: updatedImages,
      };
      await dispatch(updateProduct(API_BASE_URL, updatedProduct));
    } catch (error) {
      console.error(`Error updating image at index ${index}:`, error);
    } finally {
      setSavingState((prev) => ({ ...prev, [`image-${index}`]: false }));
    }
  }, [dispatch, selectedProduct, editableProduct]);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: 'Failed to load image',
    }));
  }, []);
  

  return {
    productId,
    editableProduct,
    savingState,
    imageErrors,
    loading,
    error,
    handleInputChange,
    handleSaveField,
    handleSaveImageField,
    handleImageError,
  };
};
