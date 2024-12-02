import { Dispatch, FunctionComponent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllCards, searchCards } from "../services/cardsService";
import { useDispatch } from "react-redux";
import Card from "../interfaces/Card";
import { CardsAction, filterCardsAction } from "../redux/PostsState";

interface NavbarProps {
    setTheme: (flag: boolean) => void
    darkMode?: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ setTheme, darkMode }) => {

    const dispatch = useDispatch<any>();

    const handleSearch = async (searchQuery: string) => {
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
                                }}
                            />

                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>


                        <span className="nav-item me-2 text-light mt-2">
                            {darkMode ? <i className="fa-solid fa-moon" onClick={() => setTheme(true)}></i> : <i className="fa-regular fa-sun" onClick={() => setTheme(false)}></i>}
                        </span>
                    </form>

                </div>

            </div>
            <div className="collapse navbar-collapse loginNav text-light" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                        <NavLink to={'/login'} className="nav-link" aria-current="page">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/register'} className="nav-link" aria-current="page">Signup</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </>);
}

export default Navbar;