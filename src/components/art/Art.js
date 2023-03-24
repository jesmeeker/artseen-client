import { Link, useNavigate } from "react-router-dom"
import { addToCart, deletePiece, getAllArt, getCurrentUserPieces } from "../../managers/Art"
import "./art.css"
import { LikeButton } from './LikeButton';
import { FavoriteButton } from './FavoriteButton';
import {AddToCartButton } from './AddToCartButton';
import { useState } from 'react';

export const Art = ({ art_piece, setArt, state, setFilteredArt, favoriteState, setArtistsArt, artistId, setFavorites}) => {
    const [registerState, setRegisterState] = useState("register")
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))

    const permissions = localStorage.getItem('permissions')

    const getUserPieces = () => {
        getCurrentUserPieces().then((data) => { setArt(data) })
    }
    
    const getAllPieces = () => {
        getAllArt().then((data) => { setArt(data) })
    }

    const deleteWindow = (pieceId) => {
        if (
            window.confirm(
                "Are you sure? This action is permanent."
            )
        ) {
            deletePiece(pieceId).then(
                () => {
                    if (state === "Portfolio") {
                        getUserPieces()
                    }
                    else if (state === "PieceFeed") {
                        getAllPieces()
                    }
                }
            )
        } else {

        }
    }
    const navigate = useNavigate()

    return (
        <>
            <div class="tile is-parent is-4">
                <article className="tile is-child box art__piececard">
                    <p className="title">
                        <Link to={`/art/${art_piece.id}`}>
                            {art_piece.title}
                        </Link></p>
                    <p className="subtitle">{art_piece.subtitle}</p>
                        <FavoriteButton art_piece={art_piece} setArt={setArt} setArtistsArt={setArtistsArt} setFilteredArt={setFilteredArt} setFavorites={setFavorites} artistId={artistId} favoriteState={favoriteState}/>

                    <img className="art__image" src={art_piece.image_url} alt={art_piece.image_url} />
                        <LikeButton art_piece={art_piece} setArt={setArt} setArtistsArt={setArtistsArt} setFilteredArt={setFilteredArt} artistId={artistId}/>
                    <div>{art_piece.artist?.full_name}</div>
                    <div>{art_piece.arttype?.label} {art_piece.media?.label}</div>
                    <div>{art_piece.length}'x{art_piece.width}'x{art_piece.height}'</div>
                    <div>${art_piece.price}</div>
                    {
                        art_piece.creator ? (

                            <>
                                <button className="button is-rounded is-link is-small" onClick={() => navigate(`${art_piece.id}/edit`)}>
                                    Edit
                                </button>
                                <button className="button is-rounded is-danger is-light is-small" onClick={() => deleteWindow(art_piece.id)}>
                                    Delete
                                </button>
                            </>
                        ) : ("")
                        }
                    <AddToCartButton art_piece={art_piece} permissions={permissions} setArt={setArt} setArtistsArt={setArtistsArt} setFilteredArt={setFilteredArt} setFavorites={setFavorites} artistId={artistId} favoriteState={favoriteState}/>
                </article>
            </div>

        </>
    )
}

