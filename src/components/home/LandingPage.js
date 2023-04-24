import { Link } from "react-router-dom";
import "./LandingPage.css";
import { useEffect } from "react";
import { LoginModal } from "../auth/LoginModal";




export const LandingPage = () => {

    useEffect(() => {
        document.addEventListener('click', () => {
    
            // Functions to open and close a modal
            function openModal($el) {
                $el.classList.add('is-active')
                    ;
            }
    
            function closeModal($el) {
                $el.classList.remove('is-active')
                    ;
            }
            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-login-modal-trigger') || []).forEach(($trigger) => {
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

    return <>
        <section className="outter option1">
            <section className="video-container">
                <video src="https://res.cloudinary.com/dry2hcdx9/video/upload/v1681937038/pexels-yaroslav-shuraev-4360463-1920x1080-24fps_cadzfb.mp4" autoPlay loop playsInline muted></video>
                <div className="callout">
                    <h2>It's time to be SEEN!</h2>
                    <div className="">They say every wrinkle is worth a thousand cuddles.  I just need a home and loving family to prove it.</div>
                    <div className="js-login-modal-trigger button is-rounded" data-target="modal-js-login"><div className="inner">Let's Go<div></div>
                    </div>

                    </div>
                    </div >
            <div id="modal-js-login" className="modal">
                <div className="modal-background"></div>
                <LoginModal />
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
            </section>
        </section>
    </>
}