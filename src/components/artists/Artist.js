import { Link } from "react-router-dom"
import { FollowButton } from "./FollowButton"
import "./artist.css"

export const Artist = ({ artist, setArtists, setFilteredArtists, setFollowedArtists, following }) => {
    return (
        <>
            <div class="tile is-parent is-4">
                <article className="tile is-child box">
                    <Link to={`/artists/${artist.id}`}>
                        <img className="artist__image" src={artist.image_url} alt={artist.image_url} />
                    </Link>
                    <nav className="level">
                <div class="level-left">
                    <div class="level-item">
                    <Link to={`/artists/${artist.id}`}>
                    <p className="is-size-5 is-capitalized has-text-weight-bold">{artist.full_name}, &nbsp;</p></Link><p className="is-size-5 is-capitalized"> {artist.city?.label}</p>
                    <div>
                        <p className="is-size-4">
                            
                        </p>
                    </div>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">
                    <FollowButton artist={artist} setArtists={setArtists} setFilteredArtists={setFilteredArtists} setFollowedArtists={setFollowedArtists} following={following}/>
                    </div>
                </div>
            </nav>
                    
                    
                    <div>
                        <p className="is-size-6">
                            {artist.bio}
                        </p>
                    </div>
                </article>
            </div>

        </>)
}