import axios from "axios";

export default axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        console.log('Error 401')
        alert("lease login")
    }
    return error;
});
