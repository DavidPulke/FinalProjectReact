import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, getAllMyCardsAction, setAllCardsAction } from "../redux/PostsState";
import { getAllCards, getAllMyCards } from "../services/cardsService";



export const useMyCards = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cards = useSelector((state: any) => state.cardsState.cards);
    const dispatch = useDispatch<Dispatch<CardsAction>>();

    useEffect(() => {
        getAllMyCards()
            .then((res) => {
                dispatch(getAllMyCardsAction(res.data));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(`Error: ${err}`);
            });
    }, [dispatch]);

    return { cards, isLoading };
};
