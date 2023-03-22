import { Link } from "react-router-dom"
import "./art.css"

export const Art = ({ art_piece }) => {

    return (
        <>
            <div class="tile is-parent is-4">
                <article className="tile is-child box art__piececard">
                    <p className="title"> 
                    <Link to={`/piece/${art_piece.id}`}>
                    {art_piece.title}
                  </Link></p>
                    <p className="subtitle">{art_piece.subtitle}</p>

                    <img className="art__image" src={art_piece.image_url} alt={art_piece.image_url} />
                    <div>{art_piece.artist?.full_name}</div>
                    <div>{art_piece.arttype?.label} {art_piece.media?.label}</div>
                    <div>{art_piece.length}'x{art_piece.width}'x{art_piece.height}'</div>
                    <div>${art_piece.price}</div>
                </article>
            </div>
            
        </>
    )
}

