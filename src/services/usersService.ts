import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Login, User } from "../interfaces/User"


const api: string = `${process.env.REACT_APP_API}/users`;

export function getUserById(id: string) {
    return axios.get(`${api}/${id}`)
}


export function login(values: Login) {
    return axios.post(`${api}/login`, values) // token
}



export async function register(userValues: User) {
    try {
        let response = await axios.post(api, userValues)
        console.log(response.data._id);

    } catch (error) {
        console.log(error);
    }
}