import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useEffect } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import EditDialog from "./EditDialog";



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

const EditModal = NiceModal.create(({children,title,onSubmit,submitText,confirmData}) => {
    const modal = useModal();
    const handleConform = (e) => {
        return onSubmit(e,{
            onSuccess: () => modal.hide(),
        })
    }
    return (
        <EditDialog
            children={children}
            title={title}
            onSubmit={ handleConform }
            submitText={submitText}
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
        />
    )
})

export {
    DeleteConfirmModal,
    EditModal,
}
