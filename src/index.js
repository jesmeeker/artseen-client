import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ArtSeen } from "./ArtSeen"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Routes >
            <Route path="*" element={<ArtSeen />} />
        </Routes>
    </BrowserRouter>
)