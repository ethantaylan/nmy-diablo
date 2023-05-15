import React from 'react';
import { ForumTopics } from 'src/app/components/forum/forum-topics';
import { SubjectModal } from 'src/app/components/forum/subject-modal';
import { supabase } from 'src/app/config';

export interface DiscussionsGeneralesProps {
  _?: any;
  getData: () => void;
  subjectsData: SubjectData[];
  topicName: string;
}

export interface SubjectData {
  author?: string;
  created_at?: string;
  id?: number | null;
  subject?: string;
  title?: string;
}

export interface SubjectModalData {
  title: string;
  description: string;
  date: string;
  author: string;
  id: number | null;
}

export const OpenedTopic: React.FC<DiscussionsGeneralesProps> = ({
  getData,
  subjectsData,
  topicName,
}) => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [subjectModal, setSubjectModal] = React.useState<any>({
    title: '',
    description: '',
    author: '',
    date: '',
    id: null,
  });

  const modalInformationsHandler = (
    subjectTitle: string,
    subjectDescription: string,
    subjectAuthor: string,
    subjectDate: string,
    subjectId: number | null
  ) => {
    setSubjectModal({
      ...subjectModal,
      title: subjectTitle,
      description: subjectDescription,
      author: subjectAuthor,
      date: subjectDate,
      id: subjectId,
    });
  };

  const deleteSubject = async (id: number) => {
    await supabase
      .from(
        topicName
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
      .delete()
      .eq('id', id);
    setIsModal(false);
    getData();
  };

  console.log(subjectsData.length);

  return (
    <div className="text-xl text-white">
      <span>{topicName}</span>
      <SubjectModal
        show={isModal}
        closeModal={() => setIsModal(false)}
        subjectTitle={subjectModal.title}
        subjectDescription={subjectModal.description}
        subjectDate={subjectModal.date}
        subjectAuthor={subjectModal.author}
        onDelete={() => deleteSubject(subjectModal.id)}
      />

      {subjectsData.length === 0 ? (
        <div className='w-full flex py-5'>
          <span className="text-neutral-500 rounded">Pas de sujets</span>
        </div>
      ) : (
        subjectsData.map((data: SubjectData, index: number) => (
          <ForumTopics
            onClick={() => {
              setIsModal(true);
              modalInformationsHandler(
                data.title || '',
                data.subject || '',
                data.author || '',
                data.created_at || '',
                data.id || null
              );
            }}
            key={index}
            title={data.title || ''}
            description={data.subject || ''}
            withAuthor
            withDate
            date={data.created_at}
            author={data.author}
          />
        ))
      )}
    </div>
  );
};
