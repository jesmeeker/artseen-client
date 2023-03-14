import { Route, Routes } from "react-router-dom"
import { ArtFeed } from "../components/art/ArtFeed"
import { PieceDetail } from "../components/art/PieceDetail"
import { Portfolio } from "../components/art/Portfolio"
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
        <Route path="/piece" >
            <Route index element={<ArtFeed/>} />
            <Route path=":pieceId" element={<PieceDetail/>} />
        </Route>
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
        </Route>
      </Routes>
    </>
  )
}