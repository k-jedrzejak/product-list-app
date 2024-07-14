import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}

const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      className={`btn btn-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
