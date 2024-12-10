import { Dispatch, FunctionComponent, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardsAction, getAllMyCardsAction, setAllCardsAction } from "../redux/PostsState";
import { getAllMyCards } from "../services/cardsService";
import { useMyCards } from "../hooks/useMyCards";
import { UserTools, useUser } from "../hooks/useUser";
import Card from "../interfaces/Card";
import LikeButton from "./tools/LikeButton";
import AddCardModal from "./Modals/AddCardModal";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    let [flag, setFlag] = useState<boolean>(false);

    let handleAddProduct = () => {
        setOpenAddModal(true);
    };

    let refresh = () => {
        setFlag(!flag)
    };
    let { cards, isLoading } = useMyCards()
    let userTools = useContext(UserTools);
    let { user } = useUser()
    useEffect(() => {
        console.log(cards);
    }, [])

    return (<section className="container text-center">
        <h2>My Cards</h2>
        <div className="cards">
            {cards.length > 0 && cards.map((card: Card) => {
                return <div className="card" key={card._id}>
                    <div className="cardTools">
                        <a className="phone" href={`tel:${card.phone}`}><i className="fa-solid fa-phone"></i></a>

                        {userTools.user.loggedIn && <LikeButton cardId={card._id as string} userId={user?._id as string} />}
                    </div>

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
            })}
        </div>

        {cards.length <= 0 ? <div>
            <h3>Good to have you here <span className="logo">{user && user.name.first}</span>.<br /></h3><h4> Here you can post your business and take it to all another new level</h4>
            <button onClick={() => handleAddProduct()} className="btn btn-outline-primary mt-3">
                Add Your Business Card
            </button>
        </div> : <p>add side Card</p>}

        <AddCardModal onHide={() => setOpenAddModal(false)} refresh={refresh} show={openAddModal} />
    </section>);
}

export default MyCards;