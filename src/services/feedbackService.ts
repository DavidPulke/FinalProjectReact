import { toast, ToastOptions } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


let styleSettings = (time: number): ToastOptions => {
    return {
        position: "top-right",
        autoClose: time,
        theme: "light"
    }
}



export function successMsg(msg: string) {
    toast.success(msg)
}


export function errorMsg(msg: string) {
    toast.error(msg, styleSettings(5000))
}