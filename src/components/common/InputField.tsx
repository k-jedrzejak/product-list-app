import React from "react";

interface InputFieldProps {
  type: "text" | "textarea";
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({ type, value, name, onChange }: InputFieldProps) => {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          className="form-control"
          value={value}
          onChange={onChange}
          name={name}
        />
      ) : (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </>
  );
};

export default InputField;
