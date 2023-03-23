import { mdiDeleteOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { deleteFromCart, getAllCartItems } from "../../managers/Cart"

export const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        getAllCartItems().then(data => setCartItems(data.pieces))
    }, [])

    const deleteItem = (id) => {
        deleteFromCart(id).then((getUserCart()))
    }

    const getUserCart = () => {
        getAllCartItems().then((data) => { setCartItems(data.pieces) })
    }

    return (
        <>
            <section class="container">
                <nav className="level">

                </nav>
                <nav className="level bottom-border">
                    <div class="level-left">
                        <div class="level-item">
                            <p className="title is-1">cart</p>
                        </div>
                    </div>
                </nav>
                {/* <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <div class="level-item">
                                <p class="title">Thumbnail</p>
                            </div>
                        </div>

                        <div class="level-item">
                            <div>
                                <p class="title">Title</p>
                            </div>
                        </div>
                    </div>
                    <div class="level-left">
                        <div class="level-item right">
                            <div>
                                <p class="title">Price</p>
                            </div>
                        </div>
                    </div>
                </nav> */}

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
                                            <p class="title">{item.title}, {item.arttype.label}</p>
                                        </p>
                                    </div>

                                </div>
                                <div class="level-item-right">
                                    <div class="title">

                                        <p>${item.price}  <span class="icon is-large"
                                            onClick={() =>
                                                deleteItem(item.id)
                                            }
                                        ><Icon path={mdiDeleteOutline} size={1} /></span></p>

                                    </div>
                                </div>
                            </article>
                        </div>
                        // <>
                        //     <nav class="level">
                        //         <div class="level-left">
                        //             <div class="level-item">
                        //                 <p class="image is-32x32">
                        //                     <img src={item.image_url} />
                        //                 </p>
                        //             </div>

                        //             <div class="level-item">
                        //                 <div>
                        //                     <p class="subtitle">{item.title}</p>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //         <div class="level-left">
                        //             <div class="level-item right">
                        //                 <div>
                        //                     <p class="title">${item.price}</p>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </nav>
                        // </>
                    ))
                }
            </section>
        </>
    )

}
