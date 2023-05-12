import React from 'react';

export interface ForumTopicsProps {
  title: string;
  description: string;
  views: number;
  posts: number;
}

export const ForumTopics: React.FC<ForumTopicsProps> = ({
  title,
  description,
  views,
  posts,
}) => {
  return (
    <div className="my-2 cursor-pointer rounded p-4 outline outline-1 outline-neutral-600">
      <div className="flex justify-between">
        <div className="flex w-full flex-col">
          <span className="mb-2">{title}</span>
          <span className="text-neutral-400">{description}</span>
        </div>
        <div className="me-5 flex flex-col items-center">
          <span>
            Vues <br /> {views}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span>
            Postes <br /> {posts}
          </span>
        </div>
      </div>
    </div>
  );
};
