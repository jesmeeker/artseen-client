import { addLike, deleteLike, getAllArt, getArtByArtistId, getSinglePiece } from "../../managers/Art"
import Icon from '@mdi/react';
import { mdiThumbUpOutline } from '@mdi/js';

export const LikeButton = ({ art_piece, setArt, setPiece, setArtistsArt, artistId, setFilteredArt}) => {
    return (<>
        {art_piece.user_likes ?
            (
                <>
                    <p class="field">
                        <a class="button is-small is-rounded is-link" style={{ width: "6px" }}
                            onClick={() =>
                                deleteLike(art_piece.id)
                                    .then(() => {
                                        getAllArt().then((data) => {
                                            setArt(data) 
                                            setFilteredArt(data)})
                                        getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                                        getSinglePiece(art_piece.id).then((data) => setPiece(data))
                                    }
                                    )
                            }>
                            <span class="icon is-small ">
                                <i class="has-text-info"></i>
                                <i><Icon path={mdiThumbUpOutline} size={.6} /></i>
                            </span>
                        </a> You and {art_piece.likes_count} others
                    </p>
                </>
            )
            :
            (
                <>
                    <p class="field">
                        <a class="button is-small is-rounded" style={{ border: "none" }}
                            onClick={() => 
                                addLike(art_piece.id)
                                .then(() => {
                                    getAllArt().then((data) => {
                                        setArt(data) 
                                        setFilteredArt(data)})
                                    getArtByArtistId(artistId).then((data) => setArtistsArt(data))
                                    getSinglePiece(art_piece.id).then((data) => setPiece(data))
                                }
                                )
                            }
                            >
                        <span class="icon is-small">
                            <i class="fa fa-header"><Icon path={mdiThumbUpOutline} size={.6} /></i>
                        </span>
                    </a>
                </p>

                </>
    )
}
    </>)
}