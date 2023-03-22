import { addFollow, deleteFollow, getAllArtists, getSingleArtist } from "../../managers/Users"

export const FollowButton = ({ artist, setArtists, setArtist }) => {
    return (<>
        {artist?.follower 
        ?
            <button className="button is-warning is-rounded is-small" width="fit-content"
            onClick={() => {
                deleteFollow(artist.id)
                .then(() => {
                    getSingleArtist(artist.id)
                  .then(setArtist)
                })
                .then(() => {
                  getAllArtists()
                  .then(setArtists)
                })
            }}>Unfollow</button>
        :
            <button className="button is-primary is-rounded is-small"
            onClick={() => {
                addFollow(artist.id)
                .then(() => {
                    getSingleArtist(artist.id)
                  .then(setArtist)
                })
                .then(() => {
                  getAllArtists()
                  .then(setArtists)
                })
            }}>Follow</button>
        }</>)
}