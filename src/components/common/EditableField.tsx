import React, { useState } from 'react';
import InputField from './InputField';
import EditButton from './EditButton';
import ActionButtons from './ActionButtons';

interface EditableFieldProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  type?: 'text' | 'textarea';
  secondaryValue?: string; 
  secondaryOnChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
}


const EditableField = ({
  value,
  name,
  onChange,
  onSave,
  onCancel,
  isSaving,
  type = 'text',
  secondaryValue,
  secondaryOnChange,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    onCancel();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <InputField type={type} value={value} name={name} onChange={onChange} />
        {secondaryValue !== undefined && secondaryOnChange && (
          <InputField type={type} value={secondaryValue} name={`${name}-secondary`} onChange={secondaryOnChange} />
        )}
        <ActionButtons onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} isSaving={isSaving} />
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-between">
      {secondaryValue !== undefined ? null : <div>{value}</div>}
      <EditButton onEditClick={handleEditClick} name={name} />
    </div>
  );
};

export default EditableField;
