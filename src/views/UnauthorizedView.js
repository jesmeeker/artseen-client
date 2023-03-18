import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { LandingPage } from "../components/home/LandingPage"

export const UnauthorizedViews = ({ token, setToken }) => {

    return <>
        <Routes>

            <Route path="*" element={
                <>
                <Outlet />
                </>
            }>




            <Route path="/home" element={ <LandingPage /> } />
    
            <Route path="/">
                <Route index element={<LandingPage token={token} />} />
                </Route>
            <Route path="register" element={<Register setToken={setToken} />} />
            <Route path="*" element={<LandingPage />} />
            <Route path="login" element={<Login setToken={setToken} />} />
            </Route>
        </Routes>
    </>
}