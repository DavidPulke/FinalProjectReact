import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { UserTools, useUser } from "../hooks/useUser";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    let { user } = useUser()
    let userTools = useContext(UserTools)
    return (<div className="gap">
        <footer className="bg-dark">
            <ul className="footerList">
                <li>
                    <i className="fa-solid fa-circle-exclamation text-warning"></i>
                    <Link to={"/about"}>About</Link>
                </li>
                {userTools.user.loggedIn && <li>
                    <i className="fa-solid fa-heart text-danger"></i>
                    <Link to={"/fav-cards"}>Fav Cards</Link>
                </li>}
                {user?.isBusiness && <li>
                    <i className="fa-regular fa-id-card"></i>
                    <Link to={'/my-cards'} className="nav-link text-light" aria-current="page">My Cards</Link>
                </li>}
            </ul>
        </footer>
    </div>);
}

export default Footer;