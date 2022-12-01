import ErrorModal,{AuthErrorModal} from "./ErrorModal"

export default registerModals () {
	NiceModal.register('auth-error-modal', AuthErrorModal);
	NiceModal.register('error-modal', ErrorModal);
}