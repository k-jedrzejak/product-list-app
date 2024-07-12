// ProductList.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchProducts, selectProduct } from '../state/productSlice';
import { RootState } from '../state/store';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: RootState) => state.products);
  const apiUrl = 'http://localhost:3000/products'; 


  useEffect(() => {
    dispatch(fetchProducts(apiUrl));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleProductClick = (productName: string) => {
    dispatch(selectProduct(productName));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.name} onClick={() => handleProductClick(product.name)}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
