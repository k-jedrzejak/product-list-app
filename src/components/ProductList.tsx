// ProductList.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchProducts } from '../state/productSlice';
import { RootState } from '../state/store';
import { API_BASE_URL } from '../constants/constants';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(fetchProducts(API_BASE_URL, signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <>
    {loading && <div className="text-center my-5">Loading...</div>}
    {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
    {!loading && !error && (
      <div className="container mt-5">
        <h2 className="mb-4">Product List</h2>
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
</>

  );
};

export default ProductList;
