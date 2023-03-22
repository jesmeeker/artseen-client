import { Link, useNavigate } from "react-router-dom"
import { deletePiece, getAllArt, getCurrentUserPieces } from "../../managers/Art"
import "./art.css"

export const Art = ({ art_piece, setArt, state }) => {
    const getUserPieces = () => {
        getCurrentUserPieces().then((data) => {setArt(data)})
    }
    const getAllPieces = () => {
        getAllArt().then((data) => {setArt(data)})
    }

    const deleteWindow = (pieceId) => {
        if (
          window.confirm(
            "Are you sure? This action is permanent."
          )
        ) {
            deletePiece(pieceId).then(
                () => {
                    if (state === "Portfolio")
                    {
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

                    <img className="art__image" src={art_piece.image_url} alt={art_piece.image_url} />
                    <div>{art_piece.artist?.full_name}</div>
                    <div>{art_piece.arttype?.label} {art_piece.media?.label}</div>
                    <div>{art_piece.length}'x{art_piece.width}'x{art_piece.height}'</div>
                    <div>${art_piece.price}</div>
                    {art_piece.creator ? (

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
                </article>
            </div>
            
        </>
    )
}

