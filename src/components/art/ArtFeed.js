import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllArt } from "../../managers/Art"
import { Art } from "./Art"

export const ArtFeed = ({ token, authorChoice, selectedCategory }) => {
    const [art, setArt] = useState([

    ])
    //   const [filteredArt_pieces, setFilteredPosts] = useState([])
    //   const [searchTerms, setSearchTerms] = useState("Search Posts By Title")

    const navigate = useNavigate()

    useEffect(() => {
        getAllArt().then((postData) => setArt(postData))
    }, [])

    return (
        <>
            <article className="art__container">
                <div>
                    {art.map((art_piece) => (
                    <Art key={art_piece.id} art_piece={art_piece} token={token} />
                    ))}
                </div>
            </article></>
    )
}
