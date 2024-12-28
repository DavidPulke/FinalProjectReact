import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { EditUserType, Login, User } from "../interfaces/User"
import { errorMsg } from "./feedbackService";


const api: string = `${process.env.REACT_APP_API}/users`;

export function getUserById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { 'x-auth-token': localStorage.token } })
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



export interface CustomJwtPayload extends JwtPayload {
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


export function getAllUsers() {
    return axios.get(api, { headers: { 'x-auth-token': localStorage.token } })
}


// delete user
export function deleteUser(userId: string) {
    return axios.delete(`${api}/${userId}`, { headers: { 'x-auth-token': localStorage.token } })
}


// search cards 
export async function searchUsers(querry: string, searchType: string) {
    try {
        let response = await getAllUsers()
        let users = await response.data
        let newUsers: User[] = []
        switch (searchType) {
            case "name":
                let filterdNames = users.filter((user: User) => (`${user.name.first} ${user.name.last}`).includes(querry));
                newUsers.push(filterdNames)
                break;
            case "email":
                let filterdEmails = users.filter((user: User) => user.email.includes(querry));
                newUsers.push(filterdEmails)
                break;
            case "country":
                let filterdCountrys = users.filter((user: User) => user.address.country.includes(querry));
                newUsers.push(filterdCountrys)
                break;
            case "city":
                let filterdCitys = users.filter((user: User) => user.address.city.includes(querry));
                newUsers.push(filterdCitys)
                break;
            default:
                break;
        }
        return newUsers

    } catch (error) {
        errorMsg(`Error: ${error}`)
    }
};



export function editUser(userId: string, newUser: EditUserType) {
    return axios.put(`${api}/${userId}`, newUser, { headers: { 'x-auth-token': localStorage.token } })
}

export function setBusiness(userId: string, isBusiness: boolean) {
    return axios.patch(`${api}/${userId}`, { isBusiness: isBusiness }, { headers: { 'x-auth-token': localStorage.token } })
}

