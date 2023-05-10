export interface ForumTopics {
  title: string;
  description: string;
  views: number;
  posts: number;
}

export const ForumSideBar = () => {
  const ForumTopics: ForumTopics[] = [
    {
      title: 'Discussions générales',
      description: 'Discussions diverses et variées sur des sujets généraux.',
      views: 11,
      posts: 2,
    },
    {
      title: 'Guides',
      description: 'Builds, farms, etc...',
      views: 11,
      posts: 2,
    },
    { title: 'Autres', description: 'Tout le reste', views: 11, posts: 2 },
  ];

  return (
    <div className="w-full rounded rounded-s-none text-white">
      <ul className="d-flex flex-row">
        {ForumTopics.map((topic) => (
          <li className="my-2 w-6/12 rounded p-4 outline outline-1 outline-neutral-300">
            <div className="flex justify-between">
              <div className="flex w-full flex-col">
                <span className="mb-2">{topic.title}</span>
                <span className="text-neutral-400">{topic.description}</span>
              </div>
              <div className="flex me-5 flex-col items-center">
                <span>Vues</span>
                <span>{topic.views}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Postes</span>
                <span>{topic.views}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
