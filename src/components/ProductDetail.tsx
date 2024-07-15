import { useProduct } from '../hooks/useProduct';
import ImageSection from './ImageSection';
import EditableField from './common/EditableField';

const ProductDetail = () => {
  const {
    editableProduct,
    imageErrors,
    loading,
    error,
    handleInputChange,
    handleSaveField,
    handleSaveImageField,
    handleImageError,
  } = useProduct();


  return (
    <>
      {loading && <div className="text-center my-5">Loading...</div>}
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!editableProduct && <div className="alert alert-warning" role="alert">Product not found</div>}
      {!loading && !error && editableProduct && (
        <div className="container mt-5">
          <div className="row gx-5">
            <div className="col-md-6">
              <h3>Images</h3>
              {editableProduct.images && editableProduct.images.length > 0 ? (
                <ImageSection
                  images={editableProduct.images}
                  imageErrors={imageErrors}
                  handleInputChange={handleInputChange}
                  handleSaveImageField={handleSaveImageField}
                  handleImageError={handleImageError}
                />
              ) : (
                <div>No images</div>
              )}
            </div>
            <div className="col-md-6 border-start">
              {Object.keys(editableProduct).map((key) => {
                if (key === 'images') return null;
                const value = editableProduct[key as keyof typeof editableProduct] ?? '';
                return (
                  <div key={key} className={`border-bottom pb-4 ${key === 'name' ? 'h2' : ''}`}>
                    <EditableField
                      value={value as string}
                      onChange={handleInputChange}
                      onSave={() => handleSaveField(key as keyof typeof editableProduct)}
                      onCancel={() => {}}
                      type={key === 'description' ? 'textarea' : 'text'}
                      name={key}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
