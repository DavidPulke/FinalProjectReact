import { Address, Image } from "./Card"

export interface Name {
    first: string,
    middle?: string,
    last: string
}



export interface User {
    name: Name,
    phone: string,
    email: string,
    password: string,
    image: Image,
    address: Address,
    isBusiness: boolean
}

export interface Login {
    email: string,
    password: string
}