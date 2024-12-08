import axios from "axios"
import { errorMsg } from "./feedbackService"
import Card from "../interfaces/Card"


const api: string = `${process.env.REACT_APP_API}/cards`



// get all cards
export function getAllCards() {

    return axios.get(api)
}



// search cards 
export async function searchCards(querry: string) {
    try {
        let response = await getAllCards()
        let cards = await response.data


        let newCards = cards.filter((card: Card) => card.title.includes(querry));
        return newCards

    } catch (error) {
        errorMsg(`Error: ${error}`)
    }
}

// cheack for a valid image
export function isValidImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        return img.src = url;
    });
}

export function getCardById(id: string) {
    return axios.get(`${api}/${id}`)
}


// like the card
/* export async function like(id: string) {
    let response = await getCardById(id)
    let cardData: Card = response.data

    

}
 */