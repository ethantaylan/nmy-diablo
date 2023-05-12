import React from 'react';

export interface ForumTopicsProps {
  title: string;
  description: string;
  onClick?: () => void;
  withAuthor?: boolean;
  withDate?: boolean;
  author?: string;
  date?: string;
}

export const ForumTopics: React.FC<ForumTopicsProps> = ({
  title,
  description,
  onClick,
  withAuthor,
  author,
  date,
  withDate,
}) => {
  return (
    <div
      onClick={onClick}
      className="my-2 cursor-pointer whitespace-nowrap rounded p-4 outline outline-1 outline-neutral-600"
    >
      <div className="flex flex-col justify-between">
        <div className="flex w-full flex-col">
          <span className="mb-2">{title}</span>
          <span className="overflow-hidden text-ellipsis text-base text-neutral-400">
            {description}
          </span>
        </div>

        {withDate && withAuthor && (
          <div
            className={`flex w-full items-${
              withAuthor && withDate && 'left'
            } center`}
          >
            <div className="mt-3 flex h-full justify-between">
              {withAuthor && (
                <span className="text-sm text-neutral-400">par: {author}</span>
              )}
              {withDate && (
                <span className="text-sm ms-5 text-neutral-400">le: {date}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
