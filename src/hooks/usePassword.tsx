import { useRef, useState } from "react";



export const usePassword = () => {

    let passInput = useRef<any>()
    let [show, setShow] = useState<boolean>(false)


    return { passInput, show, setShow }
}