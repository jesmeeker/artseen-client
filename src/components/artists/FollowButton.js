import { addFollow, deleteFollow, getAllArtists, getFollowedArtists, getSingleArtist } from "../../managers/Users"

export const FollowButton = ({ artist, setArtists, setArtist, setFilteredArtists, setFollowedArtists, following }) => {
    return (<>
        {artist.follower
            ?
            <button className="button is-warning is-rounded is-small" width="fit-content"
                onClick={() => {
                    deleteFollow(artist.id)
                        .then(() => {
                            if (following === true) {
                                getFollowedArtists().then((data) => {
                                    setFollowedArtists(data)
                                    setFilteredArtists(data)
                                })
                                getAllArtists().then((data) => setArtists(data))
                                getSingleArtist(artist.id).then((data) => setArtist(data))
                            } else {
                                getAllArtists().then((data) => {
                                    setArtists(data)
                                    setFilteredArtists(data)
                                })
                                getSingleArtist(artist.id).then((data) => setArtist(data))
                                getFollowedArtists().then((data) => setFollowedArtists(data))
                            }
                        }
                        )
                }}>Unfollow</button>
            :
            <button className="button is-primary is-rounded is-small"
                onClick={() => {
                    addFollow(artist.id)
                        .then(() => {
                            if (following === true) {
                                getFollowedArtists().then((data) => {
                                    setFollowedArtists(data)
                                    setFilteredArtists(data)
                                })
                                getAllArtists().then((data) => setArtists(data))
                                getSingleArtist(artist.id).then((data) => setArtist(data))
                            } else {
                                getAllArtists().then((data) => {
                                    setArtists(data)
                                    setFilteredArtists(data)
                                })
                                getSingleArtist(artist.id).then((data) => setArtist(data))
                                getFollowedArtists().then((data) => setFollowedArtists(data))
                            }
                        }
                        )
                }}
            >Follow</button>
        }</>)
}