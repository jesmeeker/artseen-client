

import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const ArtSeen = () => {
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))

    const setToken = (newToken) => {
        localStorage.setItem('artseen_token', newToken)
        setTokenState(newToken)
    }

    return <>
        <NavBar token={token} setToken={setToken} />
        <ApplicationViews token={token} setToken={setToken} />
    </>
}