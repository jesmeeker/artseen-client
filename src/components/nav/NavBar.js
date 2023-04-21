import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from '@mdi/react';

import { ArtistRegister } from "../auth/ArtistRegister";
import { Register } from "../auth/Register";
import "./NavBar.css";
import { mdiCartOutline } from "@mdi/js";

export const NavBar = () => {
    const [registerState, setRegisterState] = useState("register")
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))

    const navigate = useNavigate();
    const permissions = localStorage.getItem('permissions')

    const setToken = (newToken, permissions) => {
        localStorage.setItem('artseen_token', newToken)
        localStorage.setItem('permissions', permissions)
        setTokenState(newToken)
    }

    useEffect(() => {
        setTokenState(localStorage.getItem('artseen_token'))
    }, [setToken])

    const navbar = useRef();

    useEffect(() => {
        document.addEventListener('click', () => {

            // Functions to open and close a modal
            function openModal($el) {
                $el.classList.add('is-active')
                setRegisterState("register")
                    ;
            }

            function closeModal($el) {
                $el.classList.remove('is-active')
                setRegisterState("register")
                    ;
            }
            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
                const modal = $trigger.dataset.target;
                const $target = document.getElementById(modal);

                $trigger.addEventListener('click', () => {
                    openModal($target)
                });
            });

            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-cancel, .modal-card-head .delete, .modal-card-foot .button .close') || []).forEach(($close) => {
                const $target = $close.closest('.modal');

                $close.addEventListener('click', () => {
                    closeModal($target)

                });
            });
        });
    }, [])
    /*
    the mobile icon used for opening a menu
    hidden until user adjusts width
    */
    const hamburger = useRef();
    /*
    •Toggles mobile hamburger icon to active and opens on click (JSX)
    */
    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    const menuItemsToDisplay = () => {
        if (token) {
            if (permissions === "artist") {
                return <>
                    <span className="padding">/</span>
                    <Link to="/portfolio" className="navbar-item">
                        My Portfolio
                    </Link>
                    <span className="padding">/</span>
                    <Link to="portfolio/add" className="navbar-item">
                        Add Piece
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/art" className="navbar-item">
                        Browse Art
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/artists" className="navbar-item">
                        Browse Artists
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/profile" className="navbar-item">
                        Profile
                    </Link>
                </>
            }
            else if (permissions === "viewer") {
                return <>
                    <span className="padding">/</span>
                    <Link to="/favorites" className="navbar-item">
                        My Favorite Art
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/art" className="navbar-item">
                        Browse Art
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/artists" className="navbar-item">
                        Browse Artists
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/profile" className="navbar-item">
                        Profile
                    </Link>

                </>
            }
            else if (permissions === "manager") {
                return <>
                    <span className="padding">/</span>
                    <Link to="/favorites" className="navbar-item">
                        My Favorites
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/artists" className="navbar-item">
                        Browse Artists
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/art" className="navbar-item">
                        Browse Art
                    </Link>
                    <span className="padding">/</span>
                    <Link to="/profile" className="navbar-item">
                        Profile
                    </Link>
                </>
            }
        }
        else {
            return <>
            </>
        }
    }

    const rightSideNav = () => {
        if (token) {
            if (permissions === "viewer") {
                return <>
                    <p className="level">
                        <a a className="button is-rounded is-small" style={{ border: "none", background: "none" }}
                        onClick={() =>
                            (navigate("/cart"))
                        }>
                            <span className="icon is-small">
                                <i className="has-text-warning"></i>
                                <i className="has-text-black"><Icon path={mdiCartOutline} size={1.5} /></i>
                            </span>
                        </a>
                        <button
                            className="button is-rounded"
                            onClick={() => {
                                setToken("", "");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </button>
                    </p>

                </>
            } else {
                return <>
                     <p className="level">
                     <a a className="button is-rounded is-small" style={{ border: "none", background: "none" }}
                        onClick={() =>
                            (navigate("/cart"))
                        }>
                        </a>
                        <button
                            className="button is-rounded"
                            onClick={() => {
                                setToken("", "");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </button>
                    </p>
                    </>
            }
        }
        else {
            return <>
            <p className="level">
                <button className="js-modal-trigger button is-rounded is-link" data-target="modal-js-example">
                    Register
                </button>
                <Link to="/login" className="button is-rounded">
                    Login
                </Link>
                </p>
            </>
        }
    }

    return (<>

        <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/home">
                    <h1 className="title is-3">ArtSeen</h1>
                </a>
                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="true"
                    data-target="navbarBasicExample"
                    onClick={showMobileNavbar}
                    ref={hamburger}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        menuItemsToDisplay()
                    }
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                rightSideNav()
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-js-example" className="modal">
                <div className="modal-background"></div>
                <Register registerState={registerState} />
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </nav>
    </>
    );
};