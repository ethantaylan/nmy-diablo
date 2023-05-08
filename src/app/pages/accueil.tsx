import React from 'react';
import { Navbar } from '../components/navbar';

interface AccueilProps {
  onClick: () => void;
}

export const Accueil: React.FC<AccueilProps> = ({ onClick }) => {
  return (
    <div>
      <Navbar onClick={onClick} />
    </div>
  );
};
