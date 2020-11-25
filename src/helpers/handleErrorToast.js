import {toast} from "react-toastify";

export default function handleErrorToast(error) {
    if (error.response) {
        if (error.response.data.error)
            toast.error(error.response.data.error);
        else if (error.response.data.message)
            toast.error(error.response.data.message);
    } else if (error.message)
        toast.error(error.message);
}