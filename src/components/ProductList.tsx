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
    dispatch(fetchProducts(API_BASE_URL));
  }, [dispatch]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product List</h2>
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
