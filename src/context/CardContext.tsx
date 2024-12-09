import React, { createContext, useContext, useState, ReactNode } from "react";
import Card from "../interfaces/Card";

// יצירת ה-Context
interface CardContextType {
    cards: Card[];
    updateCardLikes: (cardId: string, userId: string) => void;
}

// ברירת המחדל של ה-Context
const CardContext = createContext<CardContextType | undefined>(undefined);

// קומפוננטה Provider של ה-Context
export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<Card[]>([]);

    const updateCardLikes = (cardId: string, userId: string) => {
        setCards((prevCards) => {
            return prevCards.map((card) => {
                if (card._id === cardId) {
                    const updatedLikes = card.likes?.includes(userId)
                        ? card.likes.filter((like) => like !== userId)
                        : [...(card.likes || ["a"]), userId];
                    return { ...card, likes: updatedLikes };
                }


                return card;
            });
        });
    };

    return (
        <CardContext.Provider value={{ cards, updateCardLikes }}>
            {children}
        </CardContext.Provider>
    );
};

// שימוש ב-Context
export const useCardContext = (): CardContextType => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCardContext must be used within a CardProvider");
    }
    return context;
};
