import { Route, Routes } from "react-router-dom"
import { PieceDetail } from "../components/art/PieceDetail"
import { Portfolio } from "../components/art/Portfolio"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AddPieceForm, PieceForms } from "../components/art/AddPieceForm"
import { EditPieceForm } from "../components/art/EditPieceForm"
import { PieceContainer } from "../components/art/PieceContainer"
import { ArtistFeed } from "../components/artists/ArtistsFeed"
import { ArtistDetail } from "../components/artists/ArtistDetail"
import { FavoritesContainer } from "../components/art/FavoritesContainer"
import { Profile } from "../components/users/Profile"
import { Cart } from "../components/cart/Cart"
import { CartPayment } from "../components/cart/CartPayment"
import { CartReview } from "../components/cart/CartReview"
import { CartSuccess } from "../components/cart/CartSuccess"
import { LandingPage } from "../components/home/LandingPage"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
      <Route path="/">
          <Route index element={<LandingPage token={token} />} />
          <Route path="home" element={<LandingPage/>} />
          <Route path="login" element={<Login setToken={setToken} />} />
          <Route path="register" element={<Register setToken={setToken} />} />
        </Route>
        
        <Route path="/art" >
            <Route index element={<PieceContainer/>} />
            <Route path="add" element={<AddPieceForm />} />
            <Route path=":pieceId/edit" element={<EditPieceForm />} />
            <Route path=":pieceId" element={<PieceDetail/>} />
        </Route>
        <Route path ="/favorites" element={<FavoritesContainer />} />
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
        <Route path="/cart" >
            <Route index element={<Cart/>} />
            <Route path="payment" element={<CartPayment />} />
            <Route path=":paymentId/review" element={<CartReview />} />
            <Route path="success" element={<CartSuccess />} />
        </Route>
        <Route element={<Authorized token={token} />}>
        </Route>
      </Routes>
    </>
  )
}