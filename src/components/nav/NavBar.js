import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArtistRegister } from "../auth/ArtistRegister";
import { Register } from "../auth/Register";
import "./NavBar.css";
// Creates and exports NavBar component
// uses Props in the argument defined in Rare.js
export const NavBar = ({ token, setToken }) => {
    const [registerState, setRegisterState] = useState("register")

    //defines navigate variable to use useNavigate hook
    const navigate = useNavigate();
    /*
    •useRefs() hooks are used to reference previous state 
    •Defines variable where useRef is set to an initial value of null
    */
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

            function closeAllModals() {
                (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                    closeModal($modal);
                });
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

            // // Add a keyboard event to close all modals
            // document.addEventListener('keydown', (event) => {
            //     const e = event || window.event;

            //     if (e.keyCode === 27) { // Escape key
            //         closeAllModals();
            //     }
            // });
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
    return (<>

        <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1 class="title is-3" className="rareHeader">ArtSeen</h1>
                </a>
                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="true"
                    data-target="navbarBasicExamplef"
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
                        token ?
                            (<>
                                <span className="padding">/</span>
                                <Link to="/portfolio" className="navbar-item">
                                    My Portfolio
                                </Link>
                                <span className="padding">/</span>
                                <Link to="/add" className="navbar-item">
                                    Add Piece
                                </Link>
                                <span className="padding">/</span>
                                <Link to="/" className="navbar-item">
                                    Browse Art
                                </Link>
                                <span className="padding">/</span>
                                <Link to="/profile" className="navbar-item">
                                    Profile
                                </Link>
                            </>
                            ) : (
                                ""
                            )
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                token ? (
                                    <button
                                        className="button is-rounded"
                                        onClick={() => {
                                            setToken("");
                                            navigate("/login");
                                        }}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <button className="js-modal-trigger button is-rounded is-info" data-target="modal-js-example">
                                            Register
                                        </button>
                                        <Link to="/login" className="button is-rounded">
                                            Login
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-js-example" class="modal">
                <div class="modal-background"></div>

                        <Register setRegisterState={setRegisterState} registerState={registerState}/>
                

                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        </nav>
    </>
    );
};


