import React from 'react';
import { Input } from '../components/forum/forum-searchbar';
import { ForumTopics } from '../components/forum/forum-topics';
import {
  RecentSubjectBar,
  RecentSubjectBarProps,
} from '../components/forum/recent-subject-bar';
import { useGlobalContext } from '../context/context';
import { OpenedTopic, SubjectData } from './forum/opened-topic';
import { BackIcon } from '../icons/icons';
import { NewSubjectModal } from '../components/forum/new-subject-modal';
import { supabase } from '../config';

export interface ForumTopics {
  title: string;
  description: string;
  views: number;
  posts: number;
  onClick: () => void;
}

export const Forum: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [subjectsData, setSubjectsData] = React.useState<SubjectData[]>([]);
  const [topicName, setTopicName] = React.useState<string>(
    ''
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { userAvatar } = useGlobalContext();

  const Topics: ForumTopics[] = [
    {
      title: topicName,
      description: 'Discussions diverses et variées sur des sujets généraux.',
      views: 11,
      posts: 2,
      onClick: () => {
        setActiveIndex(1);
        setTopicName('Discussions Générales');
      },
    },
    {
      title: 'Guides',
      description: 'Builds, farms, etc...',
      views: 0,
      posts: 0,
      onClick: () => {
        setActiveIndex(2);
        setTopicName('Guides');
      },
    },

    {
      title: 'Autres',
      description: 'Tout le reste',
      views: 0,
      posts: 0,
      onClick: () => {
        setActiveIndex(3);
        setTopicName('Autres');
      },
    },
  ];

  React.useEffect(() => {
    getData();
    setIsLoading(false);
  }, [topicName]);

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

  const getData = async () => {
    const { data, error } = await supabase
      .from(
        topicName
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
      .select('*');

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setSubjectsData(data);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const openedTopics = [
    { index: 1, name: 'Discussions Générales' },
    { index: 2, name: 'Guides' },
    { index: 3, name: 'Autres' },
  ];

  return (
    <div className="p-5">
      <h1 className="mt-5 text-4xl font-bold text-white">FORUM</h1>
      <div className="flex w-full flex-row justify-between rounded rounded-s-none text-white">
        <div className="mb-5 mt-5 flex w-8/12 flex-col">
          <Input placeholder="Rechercher" />
          <NewSubjectModal
            show={isModal}
            closeModal={() => setIsModal(false)}
            refreshData={() => getData()}
          />
          {activeIndex > 0 && (
            <span
              className="my-5 flex cursor-pointer items-center"
              onClick={() => setActiveIndex(0)}
            >
              {BackIcon('flex h-5 mr-1')} Retour
            </span>
          )}
          {isLoading
            ? 'Loading'
            : openedTopics.map(
                (topic) =>
                  activeIndex === topic.index && (
                    <OpenedTopic
                      key={topic.index}
                      subjectsData={subjectsData}
                      getData={() => getData()}
                      topicName={topic.name}
                    />
                  )
              )}

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
            <button
              onClick={() => setIsModal(true)}
              className="rounded bg-green-500 px-5"
            >
              + Créer un nouveau sujet
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
