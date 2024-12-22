import { createContext, useEffect, useState } from "react"
import { CustomJwtPayload, getUserDetails } from "../services/usersService"
import { User } from "../interfaces/User"
import { jwtDecode } from "jwt-decode"



export let themes = {
    light: {
        color: "#fff",
        background: "#191919"
    },
    dark: {
        color: "#000",
        background: "#F0F8FF"
    }
}

export let tools = {
    themes: themes,
    user: {
        token: localStorage.token ?? "",
        loggedIn: localStorage.token !== undefined ? true : false,
        data: {}
    }
}



export const UserTools = createContext(tools)

export const useUser = () => {
    let [user, setUser] = useState<User>()
    let payload = { isAdmin: false };
    if (localStorage.token != undefined) {
        payload = jwtDecode<CustomJwtPayload>(localStorage.token);
    }
    let [asChanged, setAsChanged] = useState<boolean>(false)


    useEffect(() => {
        if (tools.user.token) {
            getUserDetails(tools.user.token).then((res) => {
                setUser(res?.data)
            }).catch((err) => console.log(err)
            )
        }
    }, [asChanged])

    return { user, payload, setAsChanged, asChanged }
}