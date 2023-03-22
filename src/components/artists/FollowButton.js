import { addFollow, deleteFollow, getAllArtists, getSingleArtist } from "../../managers/Users"

export const FollowButton = ({ artist, setArtists, setArtist, setFilteredArtists }) => {
    return (<>
        {artist.follower
            ?
            <button className="button is-warning is-rounded is-small" width="fit-content"
                onClick={() => {
                    deleteFollow(artist.id)
                        .then(() => {
                            getAllArtists()
                                .then((data) => {setArtists(data)
                                setFilteredArtists(data)})
                            getSingleArtist(artist.id)
                                .then((data) => setArtist(data))
                        })
                }}>Unfollow</button>
            :
            <button className="button is-primary is-rounded is-small"
                onClick={() => {
                    addFollow(artist.id)
                        .then(() => {
                            getAllArtists()
                            .then((data) => {setArtists(data)
                                setFilteredArtists(data)})
                            getSingleArtist(artist.id).then((data) => setArtist(data))
                        })
                }}>Follow</button>
        }</>)
}