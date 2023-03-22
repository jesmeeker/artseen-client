import { useEffect, useState } from "react"
import { getAllArtists } from "../../managers/Users"
import { Artist } from "./Artist"

export const ArtistFeed = () => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        getAllArtists().then((data) => setArtists(data))
    }, [])
    return (
        <>
            <div className="art__container">
                {artists.map((artist) => (
                    <Artist key={artist.id} artist={artist}  setArtists={setArtists}/>
                ))}
            </div>
        </>
    )
}