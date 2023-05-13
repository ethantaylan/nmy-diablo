import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { supabase } from 'src/app/config';
import { useGlobalContext } from 'src/app/context/context';

export interface NewSubjectModalProps {
  show: boolean;
  closeModal: () => void;
}

export const NewSubjectModal: React.FC<NewSubjectModalProps> = ({
  show,
  closeModal,
}) => {
  const [title, setTitle] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [topic, setTopic] = React.useState<string>('Discussions Générales');

  const cancelButtonRef = useRef(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const { userName } = useGlobalContext();

  interface TopicTableMap {
    [key: string]: string;
  }

  const topicTableMap: TopicTableMap = {
    Autres: 'autres',
    'Discussions Générales': 'discussions-generales',
    Guides: 'guides',
  };

  const addNewSubject = async () => {
    const tableName = topicTableMap[topic];
    const { data, error } = await supabase
      .from(tableName)
      .insert([{ author: userName, title, subject: subject }]);
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-neutral-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 p-5 text-left text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="my-2 flex flex-col">
                  <span className="mb-2">Topic</span>

                  <select
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setTopic(event.target.value)
                    }
                    ref={selectRef}
                    className="mb-2 rounded border border-neutral-600 bg-neutral-800 px-2 py-2 outline-neutral-100 focus:border-0"
                    name="select for topics"
                    id="topics-select"
                  >
                    <option>Discussions générales</option>
                    <option>Guides</option>
                    <option>Autres</option>
                  </select>
                  <span className="mb-2">Titre</span>
                  <input
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(event.target.value)
                    }
                    placeholder={'Titre'}
                    className="mb-2 rounded border border-neutral-600 bg-neutral-800 px-2 py-2 outline-neutral-100 focus:border-0"
                    type="search"
                  />
                  <span className="mb-2">Sujet</span>
                  <textarea
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setSubject(event.target.value)
                    }
                    value={subject}
                    className="mb-2 h-60 rounded border border-neutral-600 bg-neutral-800 px-2 py-2 outline-neutral-100 focus:border-0"
                  />

                  <div className="flex w-full justify-center">
                    <button
                      onClick={() => addNewSubject()}
                      className="mt-4 w-3/6 rounded bg-neutral-700"
                    >
                      Poster
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
