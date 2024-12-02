import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (<div className="gap">
        <footer className="bg-dark">
            <ul>
                <li>
                    <i className="fa-solid fa-circle-exclamation text-light"></i>
                    <Link to={"/about"}>About</Link>
                </li>
            </ul>
        </footer>
    </div>);
}

export default Footer;