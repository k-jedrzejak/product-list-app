import React from "react";
import InputField from "./InputField";

interface SingleInputFieldProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: "text" | "textarea";
}

const SingleInputField = ({ value, name, onChange, type }: SingleInputFieldProps) => (
  <InputField type={type} value={value} name={name} onChange={onChange} />
);

export default SingleInputField;
