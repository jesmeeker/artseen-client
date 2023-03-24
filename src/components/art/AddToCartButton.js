import { addToCart, getAllArt, getArtByArtistId, getFavoritedArt, getSinglePiece, removeFromCart } from "../../managers/Art"
import { deleteFromCart } from "../../managers/Cart"

export const AddToCartButton = ({permissions, art_piece, setArt, setFilteredArt, favoriteState, setFavorites, setArtistsArt, artistId, setPiece }) => {

    if (permissions === "viewer") {
        if (art_piece.available_purchase === true && !art_piece.in_cart) {
            return (<>
                <button class="button is-small is-rounded is-warning is-dark"
                    onClick={() => {
                        addToCart({ piece_id: art_piece.id })
                        .then(() => {
                            getAllArt().then((data) => {
                                setArt(data)
                                setFilteredArt(data)
                                if (favoriteState === false) {
                                    const filteredCopy = data.filter(a => a.user_favorite === true)
                                    setFilteredArt(filteredCopy)
                                }
                                else {
                                    setFilteredArt(data)
                                }
                            })
                        })
                    // getFavoritedArt().then((data) => setFavorites(data))
                    // getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                    // getSinglePiece(art_piece.id).then((data) => setPiece(data))
                }}

                        >Add To Cart</button>
            </>)
        }
        else if (art_piece.in_cart === true) {
            return (<>
                <button class="button is-small is-rounded is-danger is-dark"
                    onClick={() => {
                        deleteFromCart(art_piece.id)
                            .then(() => {
                                getAllArt().then((data) => {
                                    setArt(data)
                                    setFilteredArt(data)
                                    if (favoriteState === false) {
                                        const filteredCopy = data.filter(a => a.user_favorite === true)
                                        setFilteredArt(filteredCopy)
                                    }
                                    else {
                                        setFilteredArt(data)
                                    }
                                })
                            })
                    // getFavoritedArt().then((data) => setFavorites(data))
                    // getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                    // getSinglePiece(art_piece.id).then((data) => setPiece(data))
                }}>Remove from Cart</button>

            </>)
        }
    }
    else {
        return ("")
    }
}
