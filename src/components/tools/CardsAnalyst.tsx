import { FunctionComponent } from "react";
import { useCards } from "../../hooks/useCards";
import TopCards from "./TopCards";

interface CardsAnalystProps {

}

const CardsAnalyst: FunctionComponent<CardsAnalystProps> = () => {
    let { cards, isLoading } = useCards()




    return (<aside className="container analyst text-start">
        <h2 className="text-center text-decoration-underline">Analysts:</h2>
        {isLoading && <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>}
        <div className="quantity">
            <span> {cards.length > 0 && <div className="multigraph">
                <span className="graph"></span>
                <span className="counter">{cards.length}</span>
                <span className="title">Businesses</span>
            </div>
            }</span>
        </div>
        <TopCards />
    </aside>);
}

export default CardsAnalyst;