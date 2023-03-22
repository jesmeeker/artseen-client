import { useEffect, useState } from "react"
import { getAllArtists } from "../../managers/Users"
import { Artist } from "./Artist"

export const ArtistFeed = () => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        getAllArtists().then((data) => setArtists(data))
    }, [])
    return <>
        <div className="container">
            <nav className="level">

            </nav>
            <nav className="level bottom-border">
                <div class="level-left">
                    <div class="level-item">
                        <p className="title is-1">artists</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">

                    </div>
                </div>
            </nav>
            <div className="art__container">
                {artists.map((artist) => (
                    <Artist key={artist.id} artist={artist} setArtists={setArtists} />
                ))}
            </div>
        </div>
    </>
}