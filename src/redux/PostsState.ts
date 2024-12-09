import Card from "../interfaces/Card"



// App State
export class CardsState {
    public cards: Card[] = []
}

// Action Type
export enum CardsActionType {
    CreateCard = "CreateCard",
    UpdateCard = "UpdateCard",
    DeleteCard = "DeleteCard",
    SetAllCards = "SetAllCards",
    FilterCards = "FilterCards",
    UpdateCardLikes = "UpdateCardLikes",
}

// Action
export interface CardsAction {
    type: CardsActionType;
    payload: any
}


// Action Creators
export function addCardAction(card: Card): CardsAction {
    return { type: CardsActionType.CreateCard, payload: card }
}

export function updateCardAction(card: Card): CardsAction {
    return { type: CardsActionType.UpdateCard, payload: card }
}

export function deleteCardAction(_id: number): CardsAction {
    return { type: CardsActionType.DeleteCard, payload: _id }
}

export function setAllCardsAction(cards: Card[]): CardsAction {
    return { type: CardsActionType.SetAllCards, payload: cards }
}

export function filterCardsAction(filteredCards: Card[]): CardsAction {
    return { type: CardsActionType.FilterCards, payload: filteredCards };
}

export function updateCardLikesAction(updatedCard: Card): CardsAction {
    return {
        type: CardsActionType.UpdateCardLikes,  // ודא ששימוש בפעולה הנכונה
        payload: updatedCard,
    };
}



// reducer
export function cardsReducer(currentState: CardsState = new CardsState(), action: CardsAction): CardsState {
    const newState = { ...currentState, cards: [...currentState.cards] };

    switch (action.type) {
        case CardsActionType.CreateCard:
            newState.cards.push(action.payload);
            break;

        case CardsActionType.UpdateCard:
            const indexToUpdate = newState.cards.findIndex((card) => card._id === action.payload._id);
            if (indexToUpdate !== -1) {
                newState.cards[indexToUpdate] = action.payload;
            }
            break;

        case CardsActionType.DeleteCard:
            newState.cards = newState.cards.filter((card) => card._id !== action.payload);
            break;

        case CardsActionType.SetAllCards:
            newState.cards = action.payload;
            break;

        case CardsActionType.FilterCards:
            newState.cards = action.payload;
            break;


        case CardsActionType.UpdateCardLikes:
            const cardIndex = newState.cards.findIndex((card) => card._id === action.payload._id);
            if (cardIndex !== -1) {
                newState.cards[cardIndex] = action.payload;
            }
            break;


        default:
            break;
    }

    return newState;
}