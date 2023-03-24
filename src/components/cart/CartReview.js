import { mdiDeleteOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteFromCart, getAllCartItems, getPaymentById, updateCart } from "../../managers/Cart"
import { CartItemDetail } from "./CartItemDetail"


export const CartReview = () => {
    const [cartItems, setCartItems] = useState([])
    const [cart, setCart] = useState({})
    const [payment, setPayment] = useState({})
    const { paymentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCartItems().then(data => {
            setCartItems(data.pieces)
            setCart(data)
        })
        getPaymentById(paymentId).then(data => setPayment(data))
    }, [])

    const deleteItem = (id) => {
        deleteFromCart(id).then((getUserCart()))
    }

    const getUserCart = () => {
        getAllCartItems().then(data => {
            setCartItems(data.pieces)
            setCart(data)
        })
    }

    return (
        <>
            <section class="container">
                <nav className="level">

                </nav>
                <nav className="level bottom-border-light">
                    <div class="level-left">
                        <div class="level-item">
                            <p className="title is-1">{`cart>payment>review`}</p>
                        </div>
                    </div>
                </nav>
                <section class="container is-max-desktop">
                    <nav className="level bottom-border-light">
                        <div class="level-left">
                            <p className="text is-size-3">items</p>
                        </div>
                        <div class="level-right">
                            <p className="text is-size-3">details</p>
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
                                                onClick={() => {
                                                    updateCart(parseInt(cart.id), paymentId)
                                                    navigate("/cart/success")
                                                }}>
                                                Place Order
                                            </button>
                                        </div>
                                    </div>

                                </article>
                            </article>
                        </div>
                    </div>
                </section>
                <section class="container is-max-desktop">
                    <nav className="level">
                        <div class="tile is-ancestor">

                            <div class="tile is-parent is-9 bottom-border-light">
                                <article class="tile is-child">
                                    <p className="text is-size-3">payment details</p>
                                </article>
                            </div>
                        </div>
                    </nav>
                    <div class="tile is-ancestor">

                        <div class="tile is-parent is-9">
                            <article class="tile is-child">
                                <nav className="level">
                                    <div class="level-left">
                                        <p className="text is-size-5">{payment.merchant_name} ending in x{payment.account_number}</p>
                                    </div>
                                    <div class="level-right">
                                        <p className="text is-size-5">ex. {payment.expiration_date}</p>
                                    </div>
                                </nav>
                            </article>
                        </div>
                    </div>
                </section>
            </section>

        </>
    )

}
