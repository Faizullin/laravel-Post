import NiceModal from "@ebay/nice-modal-react";
import { AuthErrorModal, ErrorModal } from "@/Components/Dialog/ErrorModal";

export default function registerModals () {
	NiceModal.register('auth-error-modal', AuthErrorModal);
	NiceModal.register('error-modal', ErrorModal);

}
