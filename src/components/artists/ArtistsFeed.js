import { useEffect, useState } from "react"
import { getAllArtists, getFollowedArtists } from "../../managers/Users"
import { Artist } from "./Artist"

export const ArtistFeed = () => {
    const [artists, setArtists] = useState([])
    const [followedArtists, setFollowedArtists] = useState([])
    const [filteredArtists, setFilteredArtists] = useState([])
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        getFollowedArtists().then((data) => setFollowedArtists(data))
        getAllArtists().then((data) => {
            setArtists(data)
            setFilteredArtists(data)
        })
    }, [])

    return <>
        <div className="container">
            <nav className="level">

            </nav>
            <nav className="level bottom-border-light">
                <div class="level-left">
                    <div class="level-item">
                        <p className="title is-1">artists</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">
                        {following ? (<button className="button is-small is-rounded is-warning"
                            onClick={() => {
                                setFollowing(!following)
                                setFilteredArtists(artists)
                            }}>All Artists</button>)
                            : (
                                <button className="button is-small is-rounded is-link"
                            onClick={() => {
                                setFollowing(!following)
                                setFilteredArtists(followedArtists)                               
                            }}>Artists I Follow</button>
                            )
                        }
                    </div>
                </div>
            </nav>
            <div className="art__container">
                {filteredArtists.map((artist) => (
                    <Artist key={artist.id} artist={artist} setArtists={setArtists} setFilteredArtists={setFilteredArtists} setFollowedArtists={setFollowedArtists} following={following}/>
                ))}
            </div>
        </div>
    </>
}