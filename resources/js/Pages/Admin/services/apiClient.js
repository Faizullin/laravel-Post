
import NiceModal from "@ebay/nice-modal-react";

const apiClient = axios.create();

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 403) {
        if(error.response.data?.message){
            return NiceModal.show("error-modal", {
                title:"403",
                message: error.response.data?.message || "",
            })
        }
    } else if (error.response.status === 401) {
        return NiceModal.show("auth-error-modal", {
            title:"401: "+ (error.response.data?.message || ""),
        });
    }
    return Promise.reject(error);
});
export default apiClient;
