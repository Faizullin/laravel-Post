import NiceModal from "@ebay/nice-modal-react";
import { AuthErrorModal, ErrorModal } from "@/Components/Dialog/ErrorModal";
import { EditModal, deleteConfirmModal } from "./TableEditModal";

export default function registerModals () {
	NiceModal.register('auth-error-modal', AuthErrorModal);
	NiceModal.register('error-modal', ErrorModal);
	NiceModal.register('edit-table-item-modal', EditModal);
	NiceModal.register('deleteConfirm-table-item-modal', deleteConfirmModal);

}
