import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, getAllMyCardsAction, setAllCardsAction } from "../redux/PostsState";
import { getAllCards, getAllMyCards } from "../services/cardsService";
import Card from "../interfaces/Card";



export const useMyCards = (refresh: Function) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cards, setCards] = useState<Card[]>([])


    useEffect(() => {
        getAllMyCards()
            .then((res) => {
                setCards(res.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(`Error: ${err}`);
            });
    }, [refresh]);

    return { cards, isLoading };
};
