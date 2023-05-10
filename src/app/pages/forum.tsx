import React from 'react';
import { ForumSideBar } from '../components/forum-side-bar';

export const Forum = () => {
  return (
    <React.Fragment>
      <h1 className='text-7xl  font-bold text-white mt-5'>FORUM</h1>
      <ForumSideBar />
    </React.Fragment>
  );
};
