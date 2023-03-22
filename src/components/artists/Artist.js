import { Link } from "react-router-dom"

export const Artist = ({ artist }) => {
    return (
        <>
            <div class="tile is-parent is-4">
                <article className="tile is-child">
                    <Link to={`/artists/${artist.id}`}>
                        <img className="art__image" src={artist.image_url} alt={artist.image_url} />
                    </Link>
                    <Link to={`/artists/${artist.id}`}>
                    <p className="is-size-4 is-capitalized has-text-weight-bold">{artist.full_name}</p>
                    </Link>
                    <p className="is-size-5">{artist.city?.label}</p>
                    <div>
                        <p className="is-size-6">
                            {artist.bio}
                        </p>
                    </div>
                </article>
            </div>

        </>)
}