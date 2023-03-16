import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllArt } from "../../managers/Art"
import { Art } from "./Art"

export const PieceFeed = ({ token, authorChoice, selectedCategory }) => {
    const [art, setArt] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllArt().then((postData) => setArt(postData))
    }, [])

    return (
        <>  
            <div className="art__container">
                <div className="art__page_header"><h1 className="title is-1">art</h1>
                <button className="button is-rounded is-link" onClick={() => navigate("add")}>
                    +Add Piece
                </button>
                </div>
            </div>
            <div className="art__container">
                {art.map((art_piece) => (
                    <Art key={art_piece.id} art_piece={art_piece} token={token} setArt={setArt} state={"PieceFeed"}/>
                ))}
            </div>
        </>
    )
}