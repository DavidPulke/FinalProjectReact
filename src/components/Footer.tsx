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
                <li> <Link to={"/about"}>
                    <i className="fa-solid fa-circle-exclamation text-warning"></i>
                    About</Link>
                </li>
                {userTools.user.loggedIn && !loggedOut && <li><Link to={"/fav-cards"}>
                    <i className="fa-solid fa-heart text-danger"></i>
                    Fav Cards</Link>
                </li>}
                {user?.isBusiness && !loggedOut && <li><Link to={'/my-cards'} className="text-light" >
                    <i className="fa-regular fa-id-card"></i>
                    My Cards</Link>
                </li>}
                {payload.isAdmin && <li><Link to={'/crm'} className=" text-light">
                    <i className="fa-solid fa-gamepad mini-logo"></i>
                    CRM</Link>
                </li>}
            </ul>
        </footer>
    </div>);
}

export default Footer;