import { addFavorite, addLike, deleteFavorite, deleteLike, getAllArt, getArtByArtistId, getFavoritedArt, getSinglePiece } from "../../managers/Art"
import Icon from '@mdi/react';
import { mdiStar, mdiStarOutline } from '@mdi/js';

export const FavoriteButton = ({ art_piece, setArt, setPiece, favoriteState, setFilteredArt, setFavorites, setArtistsArt, artistId }) => {
    console.log(favoriteState)
    return (<>
        {art_piece.user_favorite ?
            (
                <>
                    <p class="field">
                        <a class="button is-rounded is-small is-link"
                            onClick={() => {
                                deleteFavorite(art_piece.id)
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
                                getFavoritedArt().then((data) => setFavorites(data))
                                getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                                getSinglePiece(art_piece.id).then((data) => setPiece(data))
                            }}
                        > <p>
                                unfavorite
                            </p>
                            <span class="icon is-small is-warning">
                                <i class="has-text-warning">
                                    <Icon path={mdiStar} size={.7} /></i>
                            </span>
                        </a>
                    </p>
                </>
            )
            :
            (
                <>
                    <p class="field">
                        <a class="button is-rounded is-small is-link is-light" style={{ border: "none" }}
                            onClick={() => {
                                addFavorite(art_piece.id)
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
                                getFavoritedArt().then((data) => setFavorites(data))
                                getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                                getSinglePiece(art_piece.id).then((data) => setPiece(data))
                            }}>
                            <p>
                                favorite
                            </p>
                            <span class="icon is-small is-warning">
                                <i class="has-text-warning-dark"><Icon path={mdiStarOutline} size={.7} /></i>
                            </span>
                        </a>
                    </p>

                </>
            )}
    </>)
}