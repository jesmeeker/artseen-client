import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserPieces } from "../../managers/Art";
import { Art } from "./Art";
// import { deletePosts, getCurrentUserPosts } from "../../managers/Posts";
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

    // const deleteWindow = (postId) => {
    //     if (
    //         window.confirm(
    //             "Do you really want there to be one less potato post in the world?"
    //         )
    //     ) {
    //         deletePosts(postId).then(() => {
    //             {
    //                 getMyPosts()
    //             }
    //         })
    //     } else {
    //         navigate(`/posts/myposts`)
    //     }
    // }

    return (
        <><div className="art__container">
                {/* <div className="tile is-ancestor"> */}
                    
                        {art.map((art_piece) => (
                            <Art key={art_piece.id} art_piece={art_piece} token={token} />
                        ))}
                    
                {/* </div> */}
                </div>
        </>
    )
}
