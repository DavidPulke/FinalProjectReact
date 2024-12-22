import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserTools, useUser } from "../hooks/useUser";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    let { user, asChanged, payload } = useUser()
    let userTools = useContext(UserTools)
    let [loggedOut, setLoggedOut] = useState<boolean>(false)
    useEffect(() => {
        setLoggedOut(asChanged)
    }, [asChanged])
    return (<div className="gap">
        <footer className="bg-dark">
            <ul className="footerList">
                <li>
                    <i className="fa-solid fa-circle-exclamation text-warning"></i>
                    <Link to={"/about"}>About</Link>
                </li>
                {userTools.user.loggedIn && !loggedOut && <li>
                    <i className="fa-solid fa-heart text-danger"></i>
                    <Link to={"/fav-cards"}>Fav Cards</Link>
                </li>}
                {user?.isBusiness && !loggedOut && <li>
                    <i className="fa-regular fa-id-card"></i>
                    <Link to={'/my-cards'} className="nav-link text-light" aria-current="page">My Cards</Link>
                </li>}
                {payload.isAdmin && <li>
                    <i className="fa-solid fa-gamepad mini-logo"></i>
                    <Link to={'/crm'} className="nav-link text-light" aria-current="page">CRM</Link>
                </li>}
            </ul>
        </footer>
    </div>);
}

export default Footer;