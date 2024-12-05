import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { Login, User } from "../interfaces/User"
import { errorMsg } from "./feedbackService";


const api: string = `${process.env.REACT_APP_API}/users`;

export function getUserById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { 'x-auth-token': localStorage.token } })
}


export function login(values: Login) {
    // password: David@12345 email: davidpolak@gmail.com
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



interface CustomJwtPayload extends JwtPayload {
    _id?: string;
    isBusiness?: boolean;
    isAdmin: boolean;
    iat: number;
}


export async function getUserDetails(token: string) {
    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const userId = decoded._id || "Id Not Found";
        return await getUserById(userId);
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}

