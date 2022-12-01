import { Inertia } from "@inertiajs/inertia";

const apiInertia = (submitRoute,data) => {
    return Inertia.visit(submitRoute, {
        ...data,
        preserveState: true,
        preserveScroll: true,
        onCancel: () => {
            console.log("Cancel")
        },
        onSuccess: (response) => {
            console.log("Response",response);
        },
        onError: (errors) => {
            console.log("ERRors",errors);
        },
        onFinish:(d)=>{
            console.log("Finish",d)
        }
        // method: 'get',
        // data: {},
        // replace: false,
        // preserveState: false,
        // preserveScroll: false,
        // only: [],
        // headers: {},
        // errorBag: null,
        // forceFormData: false,
        // onCancelToken: cancelToken => {},
        // onCancel: () => {},
        // onBefore: visit => {},
        // onStart: visit => {},
        // onProgress: progress => {},
        // onSuccess: page => {},
        // onFinish: visit => {},
    });
}

export default apiInertia;
