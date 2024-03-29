import { mdiDeleteOutline, mdiRadioboxBlank } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteFromCart, getAllCartItems, getUserPayments, updateCart } from "../../managers/Cart"
import { CartItemDetail } from "./CartItemDetail"
import { PaymentAddModal } from "./PaymentAddModal"


export const CartPayment = () => {
    const [payments, setPayments] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [selectedPayment, setSelectedPayment] = useState(0)
    const [cart, setCart] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllCartItems().then(data => {
            setCartItems(data.pieces)
            setCart(data)
        })
        getUserPayments().then(data => setPayments(data))
    }, [])

    const getAllUserPayments = () => {
        getUserPayments().then(data => setPayments(data))
    }

    console.log(payments.length)


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

    const length = payments.length
    console.log(length)

    const paymentMethods = () => {
        if (payments.length >= 1) {
            return (<>
                {payments.map((payment) => {
                    return <div class="box">
                            <nav class="level">
                                <p class="level-item has-text-centered">
                                    <a class="subtitle has-text-dark">{payment?.merchant_name}</a>
                                </p>
                                <p class="level-item has-text-centered">
                                    <a class="subtitle has-text-dark">x{payment?.account_number}</a>
                                </p>
                                <p class="level-item has-text-centered">
                                    <a class="subtitle has-text-dark">exp. {payment?.expiration_date}</a>
                                </p>
                                <p class="level-item has-text-centered">
                                    <input
                                        name="purchase"
                                        type="radio"
                                        className="form-control"
                                        value={payment.id}
                                        checked={selectedPayment.id}
                                        onChange={(event) => {
                                            setSelectedPayment(event.target.value)
                                        }}
                                    />
                                </p>
                            </nav>
                        </div>
                })}
                    <div class="level-left">
                    <div class="js-modal-trigger content" data-target="modal-js-payment-add">                            
                            <p>
                                <button class="button is-rounded is-warning js-modal-trigger subtitle has-text-dark" data-target="modal-js-payment-add">Add New Payment</button>
                            </p>
                        </div>
                    </div>
                    </>
                );}
            else {
                return <div class="level-left">
                    <div class="js-modal-trigger content" data-target="modal-js-payment-add">
                        <p>
                            <button class="button is-rounded is-warning js-modal-trigger subtitle has-text-dark" data-target="modal-js-payment-add">Add A Payment</button>

                        </p>
                    </div>
                </div>
            
            }
        }

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
                            <p className="text is-size-3">payment methods</p>
                        </div>
                        <div class="level-right">
                            <p className="text is-size-3">details</p>
                        </div>
                    </nav>
                    <div class="tile is-ancestor">
                        <div class="tile is-parent is-9">
                            <article class="tile is-child">
                                {
                                    paymentMethods()
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
                                                onClick={() => {

                                                    navigate(`/cart/${selectedPayment}/review`)
                                                }
                                                }>
                                                Review Details
                                            </button>
                                        </div>
                                    </div>

                                </article>
                                <div id="modal-js-payment-add" class="modal">
                                <div class="modal-background"></div>
                                        <PaymentAddModal  getAllUserPayments={getAllUserPayments} setPayments={setPayments} />
                                <button class="modal-close is-large" aria-label="close"></button>
                            </div>
                            </article>
                        </div>
                    </div>
                </section>
            </section>

        </>
    )

}
