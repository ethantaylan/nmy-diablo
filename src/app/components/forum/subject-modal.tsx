import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export interface SubjectModalProps {
  show: boolean;
  closeModal: () => void;
  subjectTitle: string;
  subjectDescription: string;
  subjectDate: string;
  subjectAuthor: string;
  onDelete?: () => void
  onEdit?: () => void
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  show,
  closeModal,
  subjectAuthor,
  subjectDate,
  subjectDescription,
  subjectTitle,
  onDelete,
  onEdit
}) => {
  const cancelButtonRef = useRef(null);

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
          <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 p-5 text-left text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <p className="my-5 text-xl">{subjectTitle}</p>
                <ReactMarkdown className='text-neutral-200" my-10'>
                  {subjectDescription}
                </ReactMarkdown>
                <p className="text-sm text-neutral-400">par: {subjectAuthor}</p>
                <p className="text-sm text-neutral-400">le: {subjectDate}</p>
                <div className="mt-4 flex w-full justify-end">
                  <button onClick={onEdit} className="me-3 rounded px-2">Modifier</button>
                  <button onClick={onDelete} className="rounded bg-red-600 px-4 py-1">Supprimer</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
