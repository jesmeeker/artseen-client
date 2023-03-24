import { addToCart } from "../../managers/Art"

export const AddToCartButton = ({permissions, art_piece}) => {

    if (permissions === "viewer") {
        if (art_piece.available_purchase === true) {
            return (<>
                <button class="button is-small is-rounded is-warning is-dark"
                    onClick={() =>
                        addToCart({ piece_id: art_piece.id })
                    }>Add To Cart</button>
            </>)
        }
    }
    else {
        return ("")
    }
}
