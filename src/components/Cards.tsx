import { FunctionComponent, useEffect, useState } from "react";
import { getAllCards } from "../services/cardsService";
import Card from "../interfaces/Card";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, setAllCardsAction } from "../redux/PostsState";
import { errorMsg } from "../services/feedbackService";

interface CartsProps {

}

const Carts: FunctionComponent<CartsProps> = () => {
    let [isLoading, setIsLoading] = useState<boolean>(true)
    let cards = useSelector((state: any) => state.cardsState.cards);
    const dispatch = useDispatch<Dispatch<CardsAction>>();


    useEffect(() => {
        getAllCards().then((res) => {
            dispatch(setAllCardsAction(res.data))
            setIsLoading(false)
        }).catch((err) => errorMsg(`Error: ${err}`)
        )
    }, [])
    return (<section className="text-center">
        <h1>Cards Page</h1>
        <div className="cards">
            {isLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
            {cards.length > 0 ? cards.map((card: Card) => {
                return <div className="card" key={card._id}>
                    <a className="phone" href={`tel:${card.phone}`}><i className="fa-solid fa-phone"></i></a>

                    <img
                        src={card.image.url}
                        alt={card.image.alt}
                        title={card.title}
                        onError={(e) => {
                            e.currentTarget.src = "Images/DefaultCardImage.gif";
                        }}
                    />
                    <div className="card-data">
                        <h3>{card.title}</h3>
                        <h5>{card.subtitle}</h5>
                        <hr />
                        <p><strong>Phone:</strong> {card.phone}</p>
                        <p><strong>Address:</strong> {card.address.country}, {card.address.city}, {card.address.street}</p>
                        <p><strong>Card Number: </strong>{card.bizNumber}</p>
                    </div>
                </div>
            }) : <h1 className="text-danger m-0 m-auto">No Result</h1>}
        </div>
    </section>);


}

export default Carts;