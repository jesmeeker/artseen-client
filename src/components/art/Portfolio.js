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
            <div className="container">
                <nav className="level">

                </nav>
                <nav className="level bottom-border">
                    <div class="level-left">
                        <div class="level-item">
                            <p className="title is-1">my portfolio</p>
                        </div>
                    </div>
                    <div class="level-right" style={{}}>
                        <div class="level-item">
                            <button className="button is-rounded" onClick={() => navigate("add")}>
                                +Add Piece
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="art__container">
                    {art.map((art_piece) => (
                        <Art key={art_piece.id} art_piece={art_piece} token={token} state={"Portfolio"} setArt={setArt} />
                    ))}
                </div>
            </div>
        </>
    )
}
