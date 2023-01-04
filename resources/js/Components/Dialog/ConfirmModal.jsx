//import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import ErrorDialog from './ErrorDialog';

export default NiceModal.create(({ name }) => {
  const modal = useModal();
  return (
        <ErrorDialog
            title={name}
            onConfirm={() => modal.hide()}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
  );
});
