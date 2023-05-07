import React from 'react';
import { Navbar } from '../components/navbar';
import { ForumSideBar } from '../components/forum-side-bar';

export const Forum = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ForumSideBar />
    </React.Fragment>
  );
};
