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
      <div className="d-flex flex-row">
        <div className="mt-5 flex w-6/12 flex-col">
          <label className="mb-1 text-neutral-300" htmlFor="search">
            Rechercher
          </label>
          <input
            className="rounded border border-neutral-600 bg-neutral-800 px-2 py-2 outline-neutral-100 focus:border-0"
            type="search"
          />
        </div>

        {ForumTopics.map((topic) => (
          <div className="my-5 w-6/12 cursor-pointer rounded p-4 outline outline-1 outline-neutral-600">
            <div className="flex justify-between">
              <div className="flex w-full flex-col">
                <span className="mb-2">{topic.title}</span>
                <span className="text-neutral-400">{topic.description}</span>
              </div>
              <div className="me-5 flex flex-col items-center">
                <small>
                  Vues <br /> {topic.views}
                </small>
              </div>
              <div className="flex flex-col items-center">
                <small>
                  Postes <br /> {topic.views}
                </small>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};
