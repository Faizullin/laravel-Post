import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";



const DeleteConfirmModal = NiceModal.create(({title,message,onConfirm,confirmText,confirmData}) => {
    const modal = useModal();
    return (
        <DeleteConfirmDialog
            title={title}
            message={message}
            onConfirm={onConfirm}
            confirmText={confirmText}
            confirmData={confirmData}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
    )
})

export {
    DeleteConfirmModal,
}
