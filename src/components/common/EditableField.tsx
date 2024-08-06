import React, { useState } from "react";
import SingleInputField from "./SingleInputField";
import DualInputField from "./DualInputField";
import EditButtons from "./EditButtons";
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
          {secondaryValue !== undefined && secondaryOnChange ? (
            <DualInputField
              value={value}
              secondaryValue={secondaryValue}
              name={name}
              onChange={onChange}
              secondaryOnChange={secondaryOnChange}
              type={type}
            />
          ) : (
            <SingleInputField
              value={value}
              name={name}
              onChange={onChange}
              type={type}
            />
          )}
          <EditButtons onSave={handleSaveClick} onCancel={handleCancelClick} />
        </div>
      ) : (
        <div className="d-flex align-items-baseline justify-content-between">
          <div>
            <span>{name}: </span>
            {value}
          </div>
          <Button onClick={handleEditClick} className={"btn-link"}>
            {name === "image" ? `Edit ${name}` : "Edit"}
          </Button>
        </div>
      )}
    </>
  );
};

export default EditableField;
