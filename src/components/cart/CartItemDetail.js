import { useEffect, useState } from "react"
import { getSinglePiece } from "../../managers/Art"

export const CartItemDetail = ({ pieceId }) => {
    const [piece, setPiece] = useState({})

    useEffect(() => {
        getSinglePiece(pieceId).then(setPiece)
    }, [pieceId])

    return <>
        <div class="modal-content">
            
        <div className="art__container">
            <div class="tile is-ancestor box">
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <img className="_image" src={piece.image_url} alt={piece.image_url} /> 
                        <div className="level-item">
                                    <button className="level-left modal-cancel button is-rounded is-danger is-light is-small" data-target="modal-js-example">
                                        Close
                                    </button>
                                </div>
                    </article>
                </div>
                <div class="tile is-parent is-8">
                    <article class="tile is-child ">
                        <p className="text is-size-4" >title: {piece.title}</p>
                        <p className="text is-size-4">subtitle: {piece.subtitle}</p>

                        <p className="text is-size-4">artist: {piece.artist?.full_name}</p>
                        <p className="text is-size-4">art type: {piece.arttype?.label} {piece.media?.label}</p>
                        <p className="text is-size-4">size: {piece.length}'x{piece.width}'x{piece.height}'</p>
                        <p className="text is-size-4">price: ${piece.price}</p>
                    </article>
                </div>
            </div>
        </div>


        </div>
    </>
}