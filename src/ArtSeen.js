import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const ArtSeen = () => {
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))

    const setToken = (newToken, permissions) => {
        localStorage.setItem('artseen_token', newToken)
        localStorage.setItem('permissions', permissions)
        setTokenState(newToken)
    }

    return <>
        <NavBar token={token} setTokenState={setTokenState}/>
        <ApplicationViews token={token} setToken={setToken} />
    </>
}