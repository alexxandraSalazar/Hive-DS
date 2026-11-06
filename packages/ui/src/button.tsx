// Only a test, not the real button component.
import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <button
      style={{
        padding: '8px 16px',
        backgroundColor: variant === 'primary' ? '#ffc300' : '#e0e0e0',
        color: variant === 'primary' ? '#fff' : '#000',
        border: 'none',
        borderRadius: '18px',
      }}
      {...props}
    >
      {children}
    </button>
  );
};