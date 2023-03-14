import "./art.css"

export const Art = ({ art_piece, token }) => {

  return (
    <>
    <div className="art__piececard">
      <div>
        <div>{art_piece.title}</div>
        <div>{art_piece.subtitle}</div>
        <img src={art_piece.image_url} alt={art_piece.image_url}/>
        <div>{art_piece.artist?.full_name}</div>
        <div>{art_piece.arttype?.label} {art_piece.media?.label}</div>
        <div>{art_piece.length}'x{art_piece.width}'x{art_piece.height}'</div>
        <div>${art_piece.price}</div>
      </div>
    </div>
    </>
  )
}

