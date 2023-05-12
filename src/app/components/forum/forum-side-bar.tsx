import { useGlobalContext } from 'src/app/context/context';
import { Input } from './forum-searchbar';
import { ForumTopics } from './forum-topics';
import { RecentSubjectBar, RecentSubjectBarProps } from './recent-subject-bar';

export interface ForumTopics {
  title: string;
  description: string;
  views: number;
  posts: number;
}

export const ForumSideBar = () => {
  const { userAvatar } = useGlobalContext();

  const Topics: ForumTopics[] = [
    {
      title: 'Discussions générales',
      description: 'Discussions diverses et variées sur des sujets généraux.',
      views: 11,
      posts: 2,
    },
    {
      title: 'Guides',
      description: 'Builds, farms, etc...',
      views: 0,
      posts: 0,
    },
    { title: 'Autres', description: 'Tout le reste', views: 0, posts: 0 },
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
    <div className="flex w-full flex-row justify-between rounded rounded-s-none text-white">
      <div className="mb-5 mt-5 flex w-8/12 flex-col">
        <Input />

        {Topics.map((topic, index) => (
          <ForumTopics
            key={index}
            title={topic.title}
            description={topic.description}
            views={topic.views}
            posts={topic.posts}
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

        {RecentSubjects.map((subject) => (
          <RecentSubjectBar
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
  );
};
