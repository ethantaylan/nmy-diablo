import React from 'react';
import { ForumSideBar } from '../components/forum-side-bar';

export const Forum = () => {
  return (
    <div className="p-4">
      <h1 className="mt-5 text-4xl font-bold text-white">FORUM</h1>
      <ForumSideBar />
    </div>
  );
};
