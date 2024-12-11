import { FunctionComponent, useContext, useEffect, useState } from "react";
import { cardLikes, getAllCards, like } from "../services/cardsService";
import Card from "../interfaces/Card";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, setAllCardsAction } from "../redux/PostsState";
import { errorMsg } from "../services/feedbackService";
import CustomPagination from "./tools/CustomPagination";
import { UserTools, useUser } from "../hooks/useUser";
import { useCards } from "../hooks/useCards";
import LikeButton from "./tools/LikeButton";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface CardsProps {
    searchInput: string;
}

const Cards: FunctionComponent<CardsProps> = ({ searchInput }) => {
    let { cards, isLoading } = useCards()
    let userTools = useContext(UserTools);
    let { user } = useUser()
    const navigate: NavigateFunction = useNavigate()



    // Pagenation
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);









    return (<section className="text-center">

        <h1>Cards Page</h1>
        {searchInput == "" && <div className="topPageNav mt-5">< CustomPagination
            totalItems={cards.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        /></div>}
        <div className="cards">
            {isLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}

            {searchInput == "" && currentCards.length > 0 && currentCards.map((card: Card) => {
                return <div onClick={() => navigate(`/card-data/${card._id}`)} className="card" key={card._id}>
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
            {searchInput !== "" && cards.length > 0 && cards.map((card: Card) => {
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
            {!isLoading && cards.length <= 0 && currentCards.length <= 0 && <div id="searchError"><h1 className="text-warning">No results found!</h1></div>}

        </div>

        {searchInput == "" && < CustomPagination
            totalItems={cards.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        />}
    </section>);


}

export default Cards;