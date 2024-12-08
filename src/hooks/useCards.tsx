import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, setAllCardsAction } from "../redux/PostsState";
import { getAllCards } from "../services/cardsService";



export const useCards = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cards = useSelector((state: any) => state.cardsState.cards);
    const dispatch = useDispatch<Dispatch<CardsAction>>();

    useEffect(() => {
        getAllCards()
            .then((res) => {
                dispatch(setAllCardsAction(res.data));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(`Error: ${err}`);
            });
    }, [dispatch]);

    return { cards, isLoading };
};
