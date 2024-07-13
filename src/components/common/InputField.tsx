import React from 'react';

interface InputFieldProps {
  type: 'text' | 'textarea';
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({ type, value, name, onChange }: InputFieldProps) => {
  if (type === 'textarea') {
    return (
      <textarea
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
      />
    );
  } else {
    return (
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
      />
    );
  }
};

export default InputField;
