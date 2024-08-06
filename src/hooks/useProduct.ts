import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import useProductData from './useFetchData';
import useUpdateProduct from './useUpdateProduct';

export const useProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [editableProduct, setEditableProduct] = useState<Partial<Product>>({});
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const { selectedProduct, loading, error } = useProductData(productId);
  const { handleSave } = useUpdateProduct(selectedProduct, editableProduct);


  useEffect(() => {
    if (selectedProduct) {
      const { name, description, number, images } = selectedProduct;
      setEditableProduct({ name, description, number, images });
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


  const handleSaveField = (field: string) => {
    handleSave(field);
  };

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: 'Failed to load image',
    }));
  }, []);
  

  return {
    productId,
    editableProduct,
    imageErrors,
    loading,
    error,
    handleInputChange,
    handleSaveField,
    //handleSaveImageField,
    handleImageError,
  };
};
