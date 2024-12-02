import { FunctionComponent } from "react";
import Svg from "./tools/Svg";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    return (<section id="notFound">
        <div className="container">
            <div className="row">
                <Svg />
                <div className="col-md-6 align-self-center">
                    <h1>404</h1>
                    <h2>UH OH! You're lost.</h2>
                    <p>The page you are looking for does not exist.
                        How you got here is a mystery. But you can click the button below
                        to go back to the homepage.
                    </p>
                    <button className="btn btn-warning" onClick={() => navigate('/')}>HOME</button>
                </div>
            </div>
        </div>
    </section>);
}

export default PageNotFound;