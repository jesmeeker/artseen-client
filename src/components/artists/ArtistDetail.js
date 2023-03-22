import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtByArtistId } from "../../managers/Art";
import { getSingleArtist } from "../../managers/Users";
import { Art } from "../art/Art";
import { FollowButton } from "./FollowButton";

export const ArtistDetail = ({ setArtists }) => {
    const { artistId } = useParams()
    const [art, setArt] = useState([])
    const [artist, setArtist] = useState({
        full_name: "",
        city: {
            label: ""
        },
        user: {
            email: ""
        }
    })

    useEffect(() => {
        getSingleArtist(artistId).then(setArtist)
        getArtByArtistId(artistId).then((data) => setArt(data))
    }, [, artistId])

    return <>
        <div className="container">
            <nav className="level">

            </nav>
            <nav className="level bottom-border">
                <div class="level-left">
                    <div class="level-item">
                        <p className="is-size-1 is-1 is-lowercase">{artist.full_name}, {artist.city.label}</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">
                        <FollowButton artist={artist} setArtist={setArtist} setArtists={setArtists} />
                    </div>
                </div>
            </nav>
            <div className="art__container">

            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <img className="image" src={artist.image_url} alt={artist.image_url} />
                    </article>
                </div>
                <div class="tile is-parent is-8">
                    <article class="tile is-child ">
                        <p className="is-size-4">email: {artist.user.email}</p>
                        <br></br>
                        <p className="is-size-4">phone: {artist.phone_number}</p>
                        <br></br>
                        <p className="is-size-4">website: {artist.website}</p>
                        <br></br>
                        <p className="is-size-4">bio: {artist.bio}</p>
                    </article>
                </div>
            </div>
            </div>
            <nav className="level bottom-border">
                <div class="level-left">
                    <div class="level-item">
                        <p className="is-size-1 is-1 is-lowercase">portfolio</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">

                    </div>
                </div>
            </nav>
            <>
            <div className="art__container">
                {art.map((art_piece) => (
                    <Art key={art_piece.id} art_piece={art_piece} setArt={setArt} state={"PieceFeed"} />
                ))}
            </div>
        </>
        </div>
    </>
}