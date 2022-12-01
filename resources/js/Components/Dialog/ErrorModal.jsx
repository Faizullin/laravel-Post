import NiceModal, { useModal } from '@ebay/nice-modal-react';
import ErrorDialog,{AuthErrorDialog} from './ErrorDialog'

export default NiceModal.create(({ title, message }) => {
  const modal = useModal();
  return (
    <ErrorDialog
        title={title}
        message={message}
        // onConfirm={() => modal.hide()}
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

const AuthErrorModal = NiceModal.create(({ title, message }) => {
  const modal = useModal();
  return (
        <AuthErrorDialog
            title={title}
            message={message}
            //onConfirm={() => modal.hide()}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
  );
});

export {
    AuthErrorModal,
}