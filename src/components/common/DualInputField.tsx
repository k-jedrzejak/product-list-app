import React from "react";
import InputField from "./InputField";

interface DualInputFieldProps {
  value: string;
  secondaryValue: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  secondaryOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: "text" | "textarea";
}

const DualInputField = ({
  value,
  secondaryValue,
  name,
  onChange,
  secondaryOnChange,
  type
}: DualInputFieldProps) => (
  <div>
    <InputField type={type} value={value} name={name} onChange={onChange} />
    <InputField
      type={type}
      value={secondaryValue}
      name={`${name}-secondary`}
      onChange={secondaryOnChange}
    />
  </div>
);

export default DualInputField;
