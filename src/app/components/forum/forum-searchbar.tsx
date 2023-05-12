import React from 'react';

export interface InputProps {
  _?: any;
}

export const Input: React.FC<InputProps> = () => {
  return (
    <div className="flex flex-col">
      <input
        placeholder="Rechercher"
        className="rounded border border-neutral-600 bg-neutral-800 px-2 py-2 mb-2 outline-neutral-100 focus:border-0"
        type="search"
      />
    </div>
  );
};
