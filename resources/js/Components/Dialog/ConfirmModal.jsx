//import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import ErrorDialog from '../Error/ErrorDialog';

export default NiceModal.create(({ name }) => {
  // Use a hook to manage the modal state
  const modal = useModal();
  return (

        <ErrorDialog
            title={name}
            onConfirm={() => modal.hide()}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
    // <Modal
    //   title="Hello Antd"
    //   onOk={() => modal.hide()}
    //   visible={modal.visible}
    //   onCancel={() => modal.hide()}
    //   afterClose={() => modal.remove()}
    // >
    //   Hello {name}!
    // </Modal>
  );
});
