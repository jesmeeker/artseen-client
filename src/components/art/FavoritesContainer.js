import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PieceByArtType } from "./PieceByArtType"
import { PieceByMedium } from "./PieceByMedium"
import { PieceBySubType } from "./PieceBySubType"
import { PieceFeed } from "./PieceFeed"
import "./art.css";
import { FavoritesFeed } from "./FavoritesFeed"

export const FavoritesContainer = () => {
    const permissions = localStorage.getItem('permissions')

    const [selectedArtType, setSelectedArtType] = useState(0)
    const [selectedSubType, setSelectedSubType] = useState(0)
    const [selectedMedium, setSelectedMedium] = useState(0)
    const [favoriteState, setFavoriteState] = useState(true)

    const navigate = useNavigate()
    console.log(permissions)

    const addPieceButton = () => {
        if (permissions === "artist") {
            return (
                <button className="button is-rounded is-link" onClick={() => navigate("add")}>
                     +Add Piece
                </button>)
            
        }
    else {
    return ("")
    }
}

    return <>
        <div className="container">
            <nav className="level">

            </nav>
            <nav className="level bottom-border">
                <div class="level-left">
                    <div class="level-item">
                        <p className="title is-1">my favorites</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">
                       <p>
                         {
                             addPieceButton()
                            }
                        </p>
                    </div>
                </div>
            </nav>

            <nav class="level">
                <div class="level-left" style={{}}>
    
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <PieceByArtType setSelectedArtType={setSelectedArtType} />
                    </div>
                    <div class="level-item">
                        <PieceBySubType setSelectedSubType={setSelectedSubType} selectedArtType={selectedArtType} />
                    </div>
                    <div class="level-item">
                        <PieceByMedium setSelectedMedium={setSelectedMedium} />
                    </div>
                </div>
            </nav>
        </div>
                            
        <FavoritesFeed
            favoriteState={favoriteState}
            selectedSubType={selectedSubType}
            selectedArtType={selectedArtType}
            selectedMedium={selectedMedium}
        />
    </>
}