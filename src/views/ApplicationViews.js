import { Route, Routes } from "react-router-dom"
import { PieceDetail } from "../components/art/PieceDetail"
import { Portfolio } from "../components/art/Portfolio"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AddPieceForm, PieceForms } from "../components/art/AddPieceForm"
import { EditPieceForm } from "../components/art/EditPieceForm"
import { Profile } from "../components/artists/Profile"
import { PieceContainer } from "../components/art/PieceContainer"
import { ArtistFeed } from "../components/artists/ArtistsFeed"
import { ArtistDetail } from "../components/artists/ArtistDetail"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/">
          <Route index element={<PieceContainer token={token} />} />
          <Route path="add" element={<AddPieceForm />} />
          <Route path=":pieceId/edit" element={<EditPieceForm />} />
        </Route>
        <Route path="/art" >
            <Route index element={<PieceContainer/>} />
            <Route path=":pieceId" element={<PieceDetail/>} />
        </Route>
        <Route path="/artists" >
            <Route index element={<ArtistFeed/>} />
            <Route path=":artistId" element={<ArtistDetail/>} />
        </Route>
        <Route path="/portfolio" >
            <Route index element={<Portfolio/>} />
            <Route path="add" element={<AddPieceForm />} />
            <Route path=":pieceId/edit" element={<EditPieceForm />} />
        </Route>
        <Route path="/profile" >
            <Route index element={<Profile/>} />
        </Route>
        <Route element={<Authorized token={token} />}>
        </Route>
      </Routes>
    </>
  )
}