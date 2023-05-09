import React from 'react';
import { Banner } from '../components/banner';
import ConnectionModal from '../components/connection-modal';

export const Accueil: React.FC = () => {
  return (
    <div>
      <Banner />
      <ConnectionModal />
    </div>
  );
};
