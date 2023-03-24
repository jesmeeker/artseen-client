import { mdiDeleteOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteFromCart, getAllCartItems } from "../../managers/Cart"
import { CartItemDetail } from "./CartItemDetail"


export const CartPayment = () => {
    const [cartItems, setCartItems] = useState([])
    const [cart, setCart] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllCartItems().then(data => {setCartItems(data.pieces)
        setCart(data)})
    }, [])

    const deleteItem = (id) => {
        deleteFromCart(id).then((getUserCart()))
    }

    const getUserCart = () => {
        getAllCartItems().then(data => {setCartItems(data.pieces)
            setCart(data)})
    }

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

    return (
        <>
            <section class="container">
                <nav className="level">

                </nav>
                <nav className="level bottom-border-light">
                    <div class="level-left">
                        <div class="level-item">
                            <p className="title is-1">cart</p>
                        </div>
                    </div>
                </nav>
                <section class="container is-max-desktop">
                    <nav className="level bottom-border-light">
                        <div class="level-left">
                            <div class="level-item">
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <p className="text is-size-3">details</p>
                            </div>
                        </div>
                    </nav>
                    <div class="tile is-ancestor">

                        <div class="tile is-parent is-9">
                            <article class="tile is-child">
                                {
                                    cartItems.map((item) => (
                                        <div class="box">
                                            <article class="level">
                                                <div class="media-left">
                                                    <figure class="image is-32x32">
                                                        <img src={item.image_url} alt="Image" />
                                                    </figure>
                                                </div>
                                                <div class="level-item">
                                                    <div class="content">
                                                        <p>
                                                            <p class="js-modal-trigger subtitle has-text-dark" data-target="modal-js-cart">{item.title}, {item.arttype.label}</p>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="level-item-right">
                                                    <div class="subtitle has-text-dark">
                                                        <p>${item.price}  <span class="icon is-large has-text-dark"
                                                            onClick={() =>
                                                                deleteItem(item.id)
                                                            }
                                                        ><Icon path={mdiDeleteOutline} size={1} /></span></p>
                                                    </div>
                                                </div>
                                            </article>
                                            <div id="modal-js-cart" class="modal">
                                                <div class="modal-background"></div>
                                                <CartItemDetail pieceId={item.id} />
                                                <button class="modal-close is-large" aria-label="close"></button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child">
                                <div class="box">
                                    {
                                        cartItems.map((item) => (
                                            <article class="level">
                                                <div class="media-left">
                                                    <div>
                                                        <p class="has-text-dark is-size-7 ">{item.title}</p>
                                                    </div>
                                                </div>
                                                <div class="level-item-right">
                                                    <div class="has-text-dark is-size-6 ">
                                                        <p>${item.price} </p>
                                                    </div>
                                                </div>
                                            </article>

                                        ))
                                    }
                                    <article class="level bottom-border">
                                                <div class="media-left">
                                                    <div>
                                                        <p class="title is-size-6 has-text-dark">SubTotal</p>
                                                    </div>
                                                    <div>
                                                        <p class="is-size-7 has-text-dark">Shipping</p>
                                                    </div>
                                                </div>
                                                <div class="level-item-right">
                                                    <div class="is-size-11 has-text-dark">
                                                        <p>${cart.total?.price__sum} </p>
                                                    </div>
                                                    <div class="is-size-11 has-text-dark">
                                                        <p>$0</p>
                                                    </div>
                                                </div>
                                                
                                            </article>
                                    <article class="level">
                                                <div class="media-left">
                                                    <div>
                                                        <p class="title is-size-6 has-text-dark">Total</p>
                                                    </div>
                                                </div>
                                                <div class="level-item-right">
                                                    <div class="is-size-11 has-text-dark">
                                                        <p>${cart.total?.price__sum} </p>
                                                    </div>
                                                </div>
                                                
                                            </article>

                                </div>
                                    <article class="level">
                                    <div class="level-item">
                                                    <div class="content">
                                                        <button class="button is-rounded is-link"
                                                            onClick={()  =>
                                                            navigate("payment")}>
                                                            Place Order
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </article>
                            </article>
                        </div>
                    </div>
                </section>
            </section>

        </>
    )

}
