import React from 'react';
import EditableField from './common/EditableField';
import { Image } from '../types/product';

interface ImageSectionProps {
  images: Image[];
  imageErrors: string[];
  savingState: { [key: string]: boolean };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveImageField: (index: number) => void;
  handleImageError: (index: number) => void;
}

const ImageSection = ({
  images,
  imageErrors,
  savingState,
  handleInputChange,
  handleSaveImageField,
  handleImageError,
}: ImageSectionProps) => {
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
            onSave={() => handleSaveImageField(index)}
            onCancel={() => {}}
            isSaving={savingState[`image-${index}`]}
            name="image"
            type="text"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSection;
