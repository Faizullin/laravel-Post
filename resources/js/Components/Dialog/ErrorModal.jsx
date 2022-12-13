import NiceModal, { useModal } from '@ebay/nice-modal-react';
import ErrorDialog, { AuthErrorDialog } from './ErrorDialog';

const ErrorModal = NiceModal.create(({ title, message }) => {
    const modal = useModal();
    return (
        <ErrorDialog
            title={title}
            message={message}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
    );
});

const AuthErrorModal = NiceModal.create(({ title, message }) => {
    const modal = useModal();
    return (
        <AuthErrorDialog
            title={title}
            message={message}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
    );
});

export {
    AuthErrorModal,
    ErrorModal,
}
