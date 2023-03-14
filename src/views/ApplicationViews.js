import { Route, Routes } from "react-router-dom"
import { ArtFeed } from "../components/art/ArtFeed"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/">
          <Route index element={<ArtFeed token={token} />} />
        </Route>
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
        </Route>
      </Routes>
    </>
  )
}