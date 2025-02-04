import React from 'react';
import EditableField from './common/EditableField';
import { Image } from '../types/product';
import { useProduct } from '../hooks/useProduct';

interface ImageSectionProps {
  images: Image[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveField: (field: string) => void;
}

const ImageSection = ({
  images,
  handleInputChange,
  handleSaveField,
}: ImageSectionProps) => {
  const {
    imageErrors,
    handleImageError,
  } = useProduct(); 

  return (
    <div>
      {images.map((image, index) => (
        <div key={index} className="mb-3">
          {imageErrors[index] ? (
            <div className="alert alert-danger">{imageErrors[index]}</div>
          ) : (
            <img
              src={image.url}
              alt={image.name}
              className="img-thumbnail"
              onError={() => handleImageError(index)}
            />
          )}
          <EditableField
            value={image.url}
            secondaryValue={image.name}
            onChange={(e) => handleInputChange({ ...e, target: { ...e.target, name: `url-${index}` } })}
            secondaryOnChange={(e) => handleInputChange({ ...e, target: { ...e.target, name: `name-${index}` } })}
            onSave={() => handleSaveField('image')}
            onCancel={() => {}}
            name="image"
            type="text"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSection;
