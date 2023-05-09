import React from 'react';
import { Navbar } from '../components/navbar';

interface AccueilProps {
  onConnect: () => void;
  onSignOut: () => void;
}

export const Accueil: React.FC<AccueilProps> = ({ onConnect, onSignOut }) => {
  return (
    <div>
      <Navbar onSignOut={onSignOut} onConnect={onConnect} />
    </div>
  );
};
