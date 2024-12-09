import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { UserTools } from "../hooks/useUser";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    let userTools = useContext(UserTools)
    return (<div className="gap">
        <footer className="bg-dark">
            <ul>
                <li>
                    <i className="fa-solid fa-circle-exclamation text-light"></i>
                    <Link to={"/about"}>About</Link>
                </li>
                {userTools.user.loggedIn && <li>
                    <i className="fa-solid fa-heart text-light"></i>
                    <Link to={"/fav-cards"}>Fav Cards</Link>
                </li>}
            </ul>
        </footer>
    </div>);
}

export default Footer;