import React from 'react';

export interface InputProps {
  _?: any;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <div className="flex flex-col">
      <input
        placeholder={placeholder}
        className="mb-2 rounded border border-neutral-600 bg-neutral-800 px-2 py-2 outline-neutral-100 focus:border-0"
        type="search"
      />
    </div>
  );
};
