import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArtist } from "../../managers/Users";
import { FollowButton } from "./FollowButton";

export const ArtistDetail = ({setArtists}) => {
    const { artistId } = useParams()
    const [artist, setArtist] = useState({
        full_name: "",
        city: {
            label: ""
        }
    })

    useEffect(() => {
        getSingleArtist(artistId).then(setArtist)
    }, [, artistId])

    return <>
        <div className="art__container">
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <img className="image" src={artist.image_url} alt={artist.image_url} />
                        <FollowButton artist={artist} setArtist={setArtist} setArtists={setArtists}/>
                    </article>
                </div>
                <div class="tile is-parent is-8">
                    <article class="tile is-child ">
                        <p className="is-size-4">name: {artist.full_name}</p>
                        <p className="is-size-4">city: {artist.city.label}</p>

                        <p className="is-size-4">email: {artist.artist?.full_name}</p>
                        <p className="is-size-4">phone: {artist.phone_number}</p>
                        <p className="is-size-4">website: {artist.website}'</p>
                        <p className="is-size-4">bio: {artist.bio}</p>
                
                    </article>
                </div>
            </div>
        </div>
    </>
}