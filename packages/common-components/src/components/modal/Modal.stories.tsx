import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { Modal } from './Modal';
import { IModal, MODAL_SIZE } from './Modal_types';

export default {
  title: `components/Modal`,
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalProps: IModal = {
    isOpen: modalOpen,
    title: 'modal title',
    contents: <div>modal contents</div>,
    onClose: setModalOpen,
    size: MODAL_SIZE.REGULAR,
    useReqClose: true,
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}> modal open</button>
      <Modal
        isOpen={modalOpen}
        title={'modal title'}
        contents={<div>modal contents</div>}
        onClose={setModalOpen}
        size={MODAL_SIZE.REGULAR}
        useReqClose={true}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
