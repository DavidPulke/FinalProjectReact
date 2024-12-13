import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { searchCards } from "../services/cardsService";
import { useDispatch } from "react-redux";

import { filterCardsAction } from "../redux/PostsState";
import { UserTools, useUser } from "../hooks/useUser";


interface NavbarProps {
    setTheme: (flag: boolean) => void
    lightMode?: boolean;
    setFlag: (flag: boolean) => void;
    flag?: boolean;
    inputRef: any;
    setInputRef: (str: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ setTheme, lightMode, setFlag, flag, inputRef, setInputRef }) => {
    let userTools = useContext(UserTools)
    const dispatch = useDispatch<any>();
    let { user } = useUser()
    let [signOut, setSignOut] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate()

    let handleSignOut = () => {
        localStorage.removeItem("token");
        userTools.user.loggedIn = false;
        setSignOut(true)
        navigate('/')
    }



    const handleSearch = async (searchQuery: string) => {
        inputRef = searchQuery
        try {
            const filteredCards = await searchCards(searchQuery);

            dispatch(filterCardsAction(filteredCards));
        } catch (error) {
            console.error("Search error:", error);
        }
    };






    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink to={'/'} className="navbar-brand logo" >BCard</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/about'} className="nav-link" aria-current="page">About</NavLink>
                        </li>
                        {userTools.user.loggedIn && <li>
                            <NavLink to={'/fav-cards'} className="nav-link" aria-current="page">Fav Cards</NavLink>
                        </li>}

                        {user?.isBusiness && <li>
                            <NavLink to={'/my-cards'} className="nav-link" aria-current="page">My Cards</NavLink>
                        </li>}

                    </ul>
                    <form className="d-flex form-search gap-2" role="search">
                        <div className="search-wraper">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"

                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                    setInputRef(e.target.value)
                                }}
                            />

                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>


                        <span className="nav-item me-2 text-light mt-2">
                            {lightMode ? <i className="fa-solid fa-moon" onClick={() => setTheme(true)} title="Dark Mode"></i> : <i className="fa-regular fa-sun" onClick={() => setTheme(false)} title="Light Mode"></i>}
                        </span>
                    </form>

                </div>

            </div>
            <div className="collapse navbar-collapse loginNav text-light" id="navbarSupportedContent">



                {user != undefined &&
                    userTools.user.loggedIn ? <div className="loggedIn"> <div className="userIcon">
                        {user.image.url !== "" ? <img src={user.image.url} alt="User Image" title={`${user.name.first} ${user?.name.last} Icon`} onError={(e) => {
                            e.currentTarget.src = "Images/DefaultUserImage.png";
                            e.currentTarget.title = "default icon"
                        }} /> : <img src="Images/DefaultUserImage.png" alt="Default Image" title="default icon" />}
                    </div>

                    <i onClick={handleSignOut} className="fa-solid fa-arrow-right-from-bracket"></i> </div> : <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                        <NavLink to={'/login'} className="nav-link" aria-current="page">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/register'} className="nav-link" aria-current="page">Signup</NavLink>
                    </li>
                </ul>
                }

            </div>
        </nav>
    </>);
}

export default Navbar;