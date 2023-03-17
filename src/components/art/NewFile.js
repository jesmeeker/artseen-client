import { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/Users"


export const NewFile = ({ token, staff }) => {
    const [profile, setProfile] = useState([{
        staff: true
    }])

    useEffect(() => {
        getCurrentUser().then(data => setProfile(data))
    }, [])
    
    const user = profile[0]
    console.log(user)
    console.log(user.bio)

    return (<>
        {
            user.staff 
            ? 
            <>
            <p>You are an admin</p>
            </>
            :
            <>
            <p>FAIL. You are NOT an admin</p>
            </>
        }
        </>
    )
}
