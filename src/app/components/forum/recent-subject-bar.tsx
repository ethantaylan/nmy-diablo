import React from 'react';

export interface RecentSubjectBarProps {
  title: string;
  description: string;
  author: string;
  topic: string;
  date: string;
  time: string;
  authorAvatar: string;
}

export const RecentSubjectBar: React.FC<RecentSubjectBarProps> = ({
  title,
  description,
  author,
  topic,
  date,
  time,
  authorAvatar,
}) => {
  return (
    <div className="my-4 flex justify-between whitespace-nowrap rounded border border-neutral-700 bg-neutral-900 p-3">
      <div className="flex w-full flex-col justify-between">
        <div className="mb-3 flex w-full">
          <span className="me-3 font-bold">{title}</span>
          <span className="w-full overflow-hidden text-ellipsis text-neutral-400">
            {description}
          </span>
        </div>
        <div className="flex w-full justify-between text-neutral-400">
          <small>
            le:{' '}
            <span className="text-neutral-300">
              {date} à {time}
            </span>
          </small>
          <small className="flex">
            par: <span className="ms-1 flex text-neutral-300">{author}</span>
            <img
              className="ms-1 w-5 rounded-full"
              src={authorAvatar}
              alt="author avatar"
            />
          </small>
          <small>
            dans: <span className="text-neutral-300">{topic}</span>
          </small>
        </div>
      </div>
    </div>
  );
};
