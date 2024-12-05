import { createContext, useEffect, useState } from "react"
import { getUserDetails } from "../services/usersService"
import { User } from "../interfaces/User"



export let themes = {
    light: {
        color: "#fff",
        background: "#191919"
    },
    dark: {
        color: "#000",
        background: "#fff"
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

    useEffect(() => {
        if (tools.user.token) {
            getUserDetails(tools.user.token).then((res) => {
                setUser(res?.data)
            }).catch((err) => console.log(err)
            )
        }
    }, [])

    return { user }
}