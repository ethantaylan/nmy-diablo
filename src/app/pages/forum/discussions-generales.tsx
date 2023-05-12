import { error } from 'console';
import React from 'react';
import { ForumTopics } from 'src/app/components/forum/forum-topics';
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


export const DiscussionsGenerales: React.FC<DiscussionsGeneralesProps> = () => {
  const [subjectsData, setSubjectsData] = React.useState<SubjectData[]>([]);

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
    console.log(subjectsData);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const [date, time] = subjectsData.map((data) => data.created_at?.toString() || '').split("T");
  const formattedTime = time.slice(0, -10); // Remove the microseconds and timezone offset
  
  console.log(date); // "2023-05-12"
  console.log(formattedTime); // "09:46:32"
  

  return (
    <div className="text-xl text-white">
      <span>Discussions generales</span>

      {subjectsData.map((data: SubjectData, index: number) => (
        <ForumTopics
          key={index}
          title={data.title || ''}
          description={data.subject || ''}
          withDate
          date={data.created_at}
          author={data.author}
          withAuthor
        />
      ))}

      <ForumTopics
        title={'New title'}
        description={'New description'}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        author="efsaN"
        date="19/02/1999"
        withDate
        withAuthor
      />
    </div>
  );
};
