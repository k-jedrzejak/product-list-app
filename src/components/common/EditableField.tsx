import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

interface EditableFieldProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  type?: "text" | "textarea";
  secondaryValue?: string;
  secondaryOnChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditableField = ({
  value,
  name,
  onChange,
  onSave,
  onCancel,
  type = "text",
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

  return (
    <>
      {isEditing ? (
        <div>
          <InputField
            type={type}
            value={value}
            name={name}
            onChange={onChange}
          />
          {secondaryValue !== undefined && secondaryOnChange && (
            <InputField
              type={type}
              value={secondaryValue}
              name={`${name}-secondary`}
              onChange={secondaryOnChange}
            />
          )}
          <Button className="btn-primary mt-2" onClick={handleSaveClick}>
            Save
          </Button>
          <Button
            className="btn-secondary mt-2 ms-2"onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="d-flex align-items-baseline justify-content-between">
          {secondaryValue !== undefined ? null : (
            <div>
              <span>{name}: </span>
              {value}
            </div>
          )}
          <Button onClick={handleEditClick} className={"btn-link"}>
            {name === "image" ? `Edit ${name}` : "Edit"}
          </Button>
        </div>
      )}
    </>
  );
};

export default EditableField;
