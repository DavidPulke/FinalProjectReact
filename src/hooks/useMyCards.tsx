import { useEffect, useState } from "react";
import { getAllMyCards } from "../services/cardsService";
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
