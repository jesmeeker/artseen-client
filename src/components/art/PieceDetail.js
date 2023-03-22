import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePiece } from "../../managers/Art";
import "./art.css";
import { FavoriteButton } from "./FavoriteButton";
import { LikeButton } from "./LikeButton";

export const PieceDetail = ({ token }) => {
    const { pieceId } = useParams()
    const [piece, setPiece] = useState({})

    useEffect(() => {
        getSinglePiece(pieceId).then(setPiece)
    }, [, pieceId])

    return <>
        <div className="art__container">
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <img className="_image" src={piece.image_url} alt={piece.image_url} />
                        <LikeButton art_piece={piece} setPiece={setPiece}/>
                        <FavoriteButton art_piece={piece} setPiece={setPiece} />
                    </article>
                </div>
                <div class="tile is-parent is-8">
                    <article class="tile is-child ">
                        <p className="title" >title: {piece.title}</p>
                        <p className="title">subtitle: {piece.subtitle}</p>

                        <p className="title">artist: {piece.artist?.full_name}</p>
                        <p className="title">art type: {piece.arttype?.label} {piece.media?.label}</p>
                        <p className="title">size: {piece.length}'x{piece.width}'x{piece.height}'</p>
                        <p className="title">price: ${piece.price}</p>
                        <p className="title">about: {piece.about}</p>
                    </article>
                </div>
            </div>
        </div>
    </>
}