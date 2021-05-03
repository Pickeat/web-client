import {toast} from "react-toastify";
import logout from "./logout";

export default function handleErrorToast(error) {
    if (error.response.status === 422) {
        toast.error("Your authentication has expired or is not valid, try to reconnect");
        setTimeout(() => {
            logout();
        }, 2000);
        return;
    }
    if (error.response) {
        if (error.response.data.error)
            toast.error(error.response.data.error);
        else if (error.response.data.message)
            toast.error(error.response.data.message);
    } else if (error.message)
        toast.error(error.message);
}