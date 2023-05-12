import { error } from 'console';
import React from 'react';
import { ForumTopics } from 'src/app/components/forum/forum-topics';
import { supabase } from 'src/app/config';

export interface GuidesProps {
  _?: any;
}

export interface SubjectData {
  author?: string;
  created_at?: string;
  id?: number;
  subject?: string;
  title?: string;
}

export const Guides: React.FC<GuidesProps> = () => {
  const [subjectsData, setSubjectsData] = React.useState<SubjectData[]>([]);

  const getData = async () => {
    const { data, error } = await supabase.from('guides').select('*');
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

  return (
    <div className="text-xl text-white">
      <span>Guides</span>

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
    </div>
  );
};
