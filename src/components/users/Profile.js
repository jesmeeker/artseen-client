import { ArtistProfile } from "./ArtistProfile"
import { ManagerProfile } from "./ManagerProfile"
import "./users.css"
import { ViewerProfile } from "./ViewerProfile"



export const Profile = ({ token }) => {
    const permissions = localStorage.getItem('permissions')

    const whichProfile = () => {
        
            if (permissions === "artist") {
                return <ArtistProfile />
            }
            else if (permissions === "viewer") {
                return <ViewerProfile />
            } 
            else if (permissions === "manager") {
                return <ManagerProfile />
            }
        
    }
    return <>
        {
            whichProfile()
        }
         </>
}
