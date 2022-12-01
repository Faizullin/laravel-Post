
import { ErrorModal, LoginErrorModal } from "@/Components/Error/ErrorModal";
import NiceModal from "@ebay/nice-modal-react";
import { Link } from "@inertiajs/inertia-react";


const apiRequestError = axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log("E",error.response)
    if (error.response.status === 403) {
        if(error.response.data?.message){
            NiceModal.show(ErrorModal, {
                title:"403",
                message: error.response.data?.message || "",
            })
        }
    } else if (error.response.status === 401) {
        NiceModal.show(LoginErrorModal, {
            title:"401: "+ (error.response.data?.message || ""),
        });
    }
    return error;
});

export default apiRequestError;
