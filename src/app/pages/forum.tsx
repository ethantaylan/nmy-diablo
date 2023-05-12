import React from 'react';
import { Input } from '../components/forum/forum-searchbar';
import { ForumTopics } from '../components/forum/forum-topics';
import {
  RecentSubjectBar,
  RecentSubjectBarProps,
} from '../components/forum/recent-subject-bar';
import { useGlobalContext } from '../context/context';
import { DiscussionsGenerales } from './forum/discussions-generales';
import { Guides } from './forum/guides';
import { Autres } from './forum/autres';
import { BackIcon } from '../icons/icons';

export interface ForumTopics {
  title: string;
  description: string;
  views: number;
  posts: number;
  onClick: () => void;
}

export const Forum: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const { userAvatar } = useGlobalContext();

  const Topics: ForumTopics[] = [
    {
      title: 'Discussions générales',
      description: 'Discussions diverses et variées sur des sujets généraux.',
      views: 11,
      posts: 2,
      onClick: () => setActiveIndex(1),
    },
    {
      title: 'Guides',
      description: 'Builds, farms, etc...',
      views: 0,
      posts: 0,
      onClick: () => setActiveIndex(2),
    },

    {
      title: 'Autres',
      description: 'Tout le reste',
      views: 0,
      posts: 0,
      onClick: () => setActiveIndex(3),
    },
  ];

  const RecentSubjects: RecentSubjectBarProps[] = [
    {
      title: 'New clan',
      description: 'Lorem Ipsum',
      author: 'efsaN',
      topic: 'Discussions générales',
      date: '01/01/2023',
      time: '20h55',
      authorAvatar: userAvatar,
    },
    {
      title: 'New clan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque earum, consequatur laboriosam alias, explicabo dolorum quisquam illo iusto iure fugiat fuga excepturi itaque nostrum ex architecto unde, totam sapiente voluptatum?',
      author: 'efsaN',
      topic: 'Discussions générales',
      date: '01/01/2023',
      time: '20h55',
      authorAvatar: userAvatar,
    },
  ];

  return (
    <div className="p-5">
      <h1 className="mt-5 text-4xl font-bold text-white">FORUM</h1>
      <div className="flex w-full flex-row justify-between rounded rounded-s-none text-white">
        <div className="mb-5 mt-5 flex w-8/12 flex-col">
          <Input />

          {activeIndex > 0 && (
            <span
              className="my-5 flex cursor-pointer items-center"
              onClick={() => setActiveIndex(0)}
            >
              {BackIcon('flex h-5 mr-1')} Retour
            </span>
          )}
          {activeIndex === 1 && <DiscussionsGenerales />}
          {activeIndex === 2 && <Guides />}
          {activeIndex === 3 && <Autres />}

          {activeIndex === 0 &&
            Topics.map((topic, index) => (
              <ForumTopics
                key={index}
                title={topic.title}
                description={topic.description}
                onClick={topic.onClick}
              />
            ))}
        </div>

        <div className="ml-5 mt-5 w-4/12">
          <div className="flex justify-between">
            <span>Sujets récents</span>
            <button className="rounded bg-green-500 px-5">
              + Créer un nouveau sujets
            </button>
          </div>

          {RecentSubjects.map((subject, index) => (
            <RecentSubjectBar
              key={index}
              title={subject.title}
              description={subject.description}
              author={subject.author}
              topic={subject.topic}
              date={subject.date}
              time={subject.time}
              authorAvatar={subject.authorAvatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
