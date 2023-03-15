import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserPieces } from "../../managers/Art";
import { Art } from "./Art";
import "./art.css";

export const Portfolio = ({ token }) => {
    const [art, setArt] = useState([])
    const navigate = useNavigate()

    const getMyPieces = () => {
        getCurrentUserPieces().then((postData) => {
            setArt(postData)
        })
    }

    useEffect(() => {
        getMyPieces()
    }, [])

    return (
        <>
            <div className="art__container">
                {art.map((art_piece) => (
                    <Art key={art_piece.id} art_piece={art_piece} token={token} />
                ))}
            </div>
        </>
    )
}
