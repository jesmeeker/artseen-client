import { addFavorite, addLike, deleteFavorite, deleteLike, getAllArt } from "../../managers/Art"
import Icon from '@mdi/react';
import {mdiStar, mdiStarOutline } from '@mdi/js';

export const FavoriteButton = ({ art_piece, setArt }) => {
    return (<>
        {art_piece.user_favorite ?
            (
                <>
                    <p class="field">
                        <a class="button is-rounded is-small is-link"
                            onClick={() =>
                                deleteFavorite(art_piece.id)
                                .then(() => {
                                getAllArt().then((data) => setArt(data))
                                }
                                )
                            }> <p>
                                favorite
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
                            onClick={() =>
                                addFavorite(art_piece.id)
                                .then(() => {
                                    getAllArt().then((data) => setArt(data))
                                    })
                            }>
                                <p>
                                favorite 
                                </p>
                            <span class="icon is-small is-warning ">
                                <i class="has-text-warning"><Icon path={mdiStarOutline} size={.7} /></i>
                            </span>
                        </a>
                    </p>

                </>
            )}
    </>)
}