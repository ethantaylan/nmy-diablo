import React from 'react';
import { ForumTopics } from 'src/app/components/forum/forum-topics';
import { SubjectModal } from 'src/app/components/forum/subject-modal';
import { supabase } from 'src/app/config';

export interface DiscussionsGeneralesProps {
  _?: any;
}

export interface SubjectData {
  author?: string;
  created_at?: string;
  id?: number;
  subject?: string;
  title?: string;
}

export interface SubjectModalData {
  title: string;
  description: string;
  date: string;
  author: string;
}

export const DiscussionsGenerales: React.FC<DiscussionsGeneralesProps> = () => {
  const [subjectsData, setSubjectsData] = React.useState<SubjectData[]>([]);
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [subjectModal, setSubjectModal] = React.useState({
    title: '',
    description: '',
    author: '',
    date: '',
  });

  const getData = async () => {
    const { data, error } = await supabase
      .from('discussions-generales')
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

  const modalInformationsHandler = (
    subjectTitle: string,
    subjectDescription: string,
    subjectAuthor: string,
    subjectDate: string
  ) => {
    setSubjectModal({
      ...subjectModal,
      title: subjectTitle,
      description: subjectDescription,
      author: subjectAuthor,
      date: subjectDate,
    });
  };

  return (
    <div className="text-xl text-white">
      <span>Discussions générales</span>
      <SubjectModal
        show={isModal}
        closeModal={() => setIsModal(false)}
        subjectTitle={subjectModal.title}
        subjectDescription={subjectModal.description}
        subjectDate={subjectModal.date}
        subjectAuthor={subjectModal.author}
      />

      {subjectsData.map((data: SubjectData, index: number) => (
        <ForumTopics
          onClick={() => {
            setIsModal(true);
            modalInformationsHandler(
              data.title || '',
              data.subject || '',
              data.author || '',
              data.created_at || ''
            );
          }}
          key={index}
          title={data.title || ''}
          description={data.subject || ''}
          withDate
          date={data.created_at}
          author={data.author}
          withAuthor
        />
      ))}
    </div>
  );
};
