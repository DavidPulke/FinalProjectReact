import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/cardsService";
import Card from "../interfaces/Card";
import MapComponent from "./tools/MapComponent";

interface CardDataProps { }

const CardData: FunctionComponent<CardDataProps> = () => {
    let { cardId } = useParams<string>();
    let [card, setCard] = useState<Card | null>(null);

    useEffect(() => {
        getCardById(cardId as string)
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err));
    }, [cardId]);

    const address = card ? `${card.address.city}, ${card.address.country}` : '';




    return (
        <section className="container text-center">
            {card && (
                <div className="card-data-solo">
                    <div className="cardHero">
                        <h2 className="logo">{card.title}</h2>
                        <h3>{card.subtitle}</h3>
                        <img src={card.image.url} alt={card.image.alt} onError={(e) => {
                            e.currentTarget.src = "https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png";
                        }} />
                    </div>

                    <div id="cardMap">
                        <h2>Our Location</h2>
                        <h5>{card && <>{card.address.country}, {card.address.city}, {card.address.houseNumber}</>}</h5>
                        <MapComponent address={address} />
                        <div className="footerWraper">
                            <div className="cardFooter">
                                <hr />
                                {card && (
                                    <div id="cardContact" >
                                        <a title={card.phone} className="phone" href={`tel:${card.phone}`}><i className="fa-solid fa-phone"></i></a>
                                        <a title={card.email} className="mail" href={`mailto:${card.email}`}><i className="fa-solid fa-at"></i></a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CardData;
