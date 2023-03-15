import { Route, Routes } from "react-router-dom"
import { ArtFeed, PieceFeed } from "../components/art/PieceFeed"
import { PieceDetail } from "../components/art/PieceDetail"
import { Portfolio } from "../components/art/Portfolio"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AddPieceForm } from "../components/art/AddPieceForm"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/">
          <Route index element={<PieceFeed token={token} />} />
        </Route>
        <Route path="/piece" >
            <Route index element={<PieceFeed/>} />
            <Route path=":pieceId" element={<PieceDetail/>} />
        </Route>
        <Route path="/portfolio" >
            <Route index element={<Portfolio/>} />
            <Route path="add" element={<AddPieceForm />} />
        </Route>
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
        </Route>
      </Routes>
    </>
  )
}