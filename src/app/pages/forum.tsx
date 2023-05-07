import React from 'react';
import { Navbar } from '../components/navbar';
import { ForumSideBar } from '../components/forum-side-bar';

export const Forum = () => {
  return (
    <>
      <ForumSideBar />
      <div>
        {' '}
        <Navbar />
        <h1 className="text-white">forum</h1>
      </div>
    </>
  );
};
