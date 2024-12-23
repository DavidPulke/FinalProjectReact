import axios from "axios"
import { errorMsg, successMsg } from "./feedbackService"
import Card from "../interfaces/Card"
import { getUserDetails } from "./usersService"
import { User } from "../interfaces/User"
import { useUser } from "../hooks/useUser"


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

export async function cardLikes(id: string) {
    let response = await getCardById(id);
    let cardData: string[] = response.data.likes;

    return cardData;
};

export async function userLikes(userId: string) {
    try {

        const response = await getAllCards();
        const cardsData = response.data;


        if (cardsData.length > 0) {
            const userLikedCards = cardsData.filter((card: Card) => card.likes?.includes(userId));
            return userLikedCards;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}




export async function like(id: string, userId: string) {
    try {

        let cardData: string[] = await cardLikes(id);

        if (cardData.includes(userId)) {
            cardData = cardData.filter((like) => like !== userId);
            await axios.patch(`${api}/${id}`, {
                likes: cardData
            }, { headers: { 'x-auth-token': localStorage.token } });
        } else {
            cardData.push(userId);
            await axios.patch(`${api}/${id}`, {
                likes: cardData
            }, { headers: { 'x-auth-token': localStorage.token } });
        }
    } catch (error) {
        console.log(error);
    }
};


// get my cards

export function getAllMyCards() {
    return axios.get(`${api}/my-cards`, { headers: { 'x-auth-token': localStorage.token } })
}

export function createCard(card: Card) {
    return axios.post(api, card, { headers: { 'x-auth-token': localStorage.token } })
}


export function deleteCard(cardId: string) {
    return axios.delete(`${api}/${cardId}`, { headers: { 'x-auth-token': localStorage.token } })
}


// editCard
export function editCard(cardId: string, cardValues: Card) {
    console.log(cardValues);

    return axios.put(`${api}/${cardId}`, cardValues, { headers: { 'x-auth-token': localStorage.token } })
}