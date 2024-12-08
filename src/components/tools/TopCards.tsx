import { FunctionComponent, useEffect, useState } from "react";
import Card from "../../interfaces/Card";
import { likesAnalyst } from "./handlers/likesAnalyst";

interface TopCardsProps { }

const TopCards: FunctionComponent<TopCardsProps> = () => {
    let [topCards, setTopCards] = useState<Card[]>([]);

    useEffect(() => {
        likesAnalyst()
            .then((res) => setTopCards(res))
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="topCards">

            <h3 className="text-decoration-underline">Top Business of the week:</h3>
            <div className="podium">
                {/* מקום ראשון */}
                <div className="place place1">
                    <img src="Images/aboutImages/goldCrown.png" alt="crown" />
                    {topCards[0] && (
                        <div className="card" key={topCards[0]._id}>
                            <img
                                src={topCards[0].image.url}
                                alt={topCards[0].image.alt}
                                title={topCards[0].title}
                                onError={(e) => {
                                    e.currentTarget.src = "Images/DefaultCardImage.gif";
                                }}
                            />
                            <h5>{topCards[0].likes?.length} Likes</h5>
                        </div>
                    )}
                </div>

                {/* מקום שני */}
                <div className="place place2">
                    <img src="Images/aboutImages/silverCrown.png" alt="crown" />
                    {topCards[1] && (
                        <div className="card" key={topCards[1]._id}>
                            <img
                                src={topCards[1].image.url}
                                alt={topCards[1].image.alt}
                                title={topCards[1].title}
                                onError={(e) => {
                                    e.currentTarget.src = "Images/DefaultCardImage.gif";
                                }}
                            />
                            <h5>{topCards[1].likes?.length} Likes</h5>
                        </div>
                    )}
                </div>

                {/* מקום שלישי */}
                <div className="place place3">
                    <img src="Images/aboutImages/bronzeCrown.png" alt="crown" />
                    {topCards[2] && (
                        <div className="card" key={topCards[2]._id}>
                            <img
                                src={topCards[2].image.url}
                                alt={topCards[2].image.alt}
                                title={topCards[2].title}
                                onError={(e) => {
                                    e.currentTarget.src = "Images/DefaultCardImage.gif";
                                }}
                            />
                            <h5>{topCards[2].likes?.length} Likes</h5>
                        </div>
                    )}
                </div>
            </div>
            <img className="podiumImg" src="Images/aboutImages/podium.png" alt="podium" />
        </div>
    );
};

export default TopCards;
