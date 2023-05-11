import React from 'react';
import { Banner } from '../components/banner';

export const Accueil: React.FC = () => {
  return (
    <div>
      <Banner />
      <div className="flex p-4">
        <h1 className="mt-5 text-4xl font-bold text-white">NEWS</h1>
      </div>
    </div>
  );
};
