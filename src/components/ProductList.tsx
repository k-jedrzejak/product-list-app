import { Link } from "react-router-dom";
import React from "react";
import useProductData from "../hooks/useFetchData";

const ProductList = () => {
  const { products, loading, error } = useProductData();

  return (
    <>
      {loading && <div className="text-center my-5">Loading...</div>}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <div className="container mt-5">
          <h2 className="mb-4">Product List</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li key={product.id} className="list-group-item">
                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none"
                >
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

export default React.memo(ProductList);
