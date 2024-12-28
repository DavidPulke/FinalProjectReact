import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { NavigateFunction, NavLink, useLocation, useNavigate } from "react-router-dom";
import { searchCards } from "../services/cardsService";
import { useDispatch } from "react-redux";

import { filterCardsAction } from "../redux/PostsState";
import { UserTools, useUser } from "../hooks/useUser";


interface NavbarProps {
    setTheme: (flag: boolean) => void
    lightMode?: boolean;
    inputRef: any;
    setInputRef: (str: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ setTheme, lightMode, inputRef, setInputRef }) => {
    let userLocation = useLocation()

    let userTools = useContext(UserTools)
    const dispatch = useDispatch<any>();
    let { user, payload, setAsChanged } = useUser()
    const navigate: NavigateFunction = useNavigate()


    let handleSignOut = () => {
        localStorage.removeItem("token");
        userTools.user.loggedIn = false;
        setAsChanged(true)
        navigate('/')
        window.history.go(0)
    }

    if (inputRef.length == 1 && userLocation.pathname !== '/') {
        navigate('/')
        console.log('as navigated');
    }

    const handleSearch = async (event: any, searchQuery: string) => {
        event.preventDefault()
        try {
            inputRef = searchQuery

            const filteredCards = await searchCards(searchQuery.toLowerCase());
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

                        {user?.isBusiness && user != undefined && <li>
                            <NavLink to={'/my-cards'} className="nav-link" aria-current="page">My Cards</NavLink>
                        </li>}

                        {payload.isAdmin && <li>
                            <NavLink to={'/crm'} className="nav-link" aria-current="page">CRM</NavLink>
                        </li>}





                    </ul>
                    <form onSubmit={(e) => handleSearch(e, inputRef)} className="d-flex form-search gap-2" role="search">
                        <div className="search-wraper">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search Cards"
                                aria-label="Search"
                                onChange={(e) => {
                                    setInputRef(e.target.value)
                                }}
                            />

                            <i onClick={(e) => handleSearch(e, inputRef)} className="fa-solid fa-magnifying-glass"></i>
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
                        <i onClick={() => navigate(`/edit-user/${user?._id}`)} title="Edit User" className="fa-solid fa-pencil logo"></i>
                        {user.image.url !== "" ? <img src={user.image.url} alt="User Image" title={`${user.name.first} ${user?.name.last} Icon`} onError={(e) => {
                            e.currentTarget.src = "/Images/DefaultUserImage.png";
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