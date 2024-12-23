import { FunctionComponent, useContext, useState } from "react";
import { deleteCard } from "../services/cardsService";
import { useMyCards } from "../hooks/useMyCards";
import { UserTools, useUser } from "../hooks/useUser";
import Card from "../interfaces/Card";
import LikeButton from "./tools/LikeButton";
import AddCardModal from "./Modals/AddCardModal";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import EditCardModal from "./Modals/EditCardModal";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    let [flag, setFlag] = useState<boolean>(false);
    let [cardId, setCardId] = useState<string>('');
    const navigate: NavigateFunction = useNavigate()

    let handleAddProduct = () => {
        setOpenAddModal(true);
    };

    let handleEditProduct = () => {
        setOpenEditModal(true);
    };

    let handleDeleteCard = (cardId: string) => {

        if (prompt("This card would be DELETED permanently!!. please type yes, if you want to Delete this card!") == "yes") {
            deleteCard(cardId).then(() => {
                successMsg("Your Card as been DELETED successfuly");
                refresh()
            }).catch((err) => console.log(err))
        } else {
            alert("you did not typed 'YES' Therefor the card Stays ")
        }
    }

    let refresh = () => {
        setFlag(!flag)
    };
    let { cards } = useMyCards(refresh)
    let userTools = useContext(UserTools);
    let { user } = useUser()


    return (<section className=" text-center">
        <h2>My Cards</h2>
        <div className="cards">
            {cards.length > 0 && cards.map((card: Card) => {
                return <div className="card" key={card._id}>
                    <i onClick={() => navigate(`/card-data/${card._id}`)} className="fa-solid fa-eye"></i>
                    <div className="cardTools">
                        <a className="phone" href={`tel:${card.phone}`}><i className="fa-solid fa-phone"></i></a>

                        {userTools.user.loggedIn && <LikeButton cardId={card._id as string} userId={user?._id as string} />}
                        {user?.isBusiness && <i onClick={() => {
                            handleEditProduct()
                            setCardId(card._id as string)
                        }} className="fa-regular fa-pen-to-square text-warning"></i>}
                        {user?.isBusiness && <i className="fa-regular fa-trash-can text-danger" onClick={() => handleDeleteCard(card._id as string)}></i>}
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
        </div> : <button onClick={() => handleAddProduct()} className="btn btn-outline-primary mt-3">
            Add Your Business Card
        </button>}

        <AddCardModal onHide={() => setOpenAddModal(false)} refresh={refresh} show={openAddModal} />

        <EditCardModal onHide={() => setOpenEditModal(false)} refresh={refresh} show={openEditModal} cardId={cardId} />
    </section>);
}

export default MyCards;