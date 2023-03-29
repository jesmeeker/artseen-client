import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PieceByArtType } from "./PieceByArtType"
import { PieceByMedium } from "./PieceByMedium"
import { PieceBySubType } from "./PieceBySubType"
import { PieceFeed } from "./PieceFeed"
import "./art.css";

export const PieceContainer = () => {
    const [selectedArtType, setSelectedArtType] = useState(0)
    const [selectedSubType, setSelectedSubType] = useState(0)
    const [selectedMedium, setSelectedMedium] = useState(0)
    const [favoriteState, setFavoriteState] = useState(true)
    const permissions = localStorage.getItem('permissions')

    const navigate = useNavigate();

    const addPieceButton = () => {
        if (permissions === "artist") {
            return <button className="button is-rounded is-link" onClick={() => navigate("add")}>
                +Add Piece
            </button>
        } else {
            return <></>
        }
    }
    return <>
        <div className="container">
            <nav className="level">

            </nav>
            <nav className="level bottom-border">
                <div class="level-left">
                    <div class="level-item">
                        <p className="title is-1">art</p>
                    </div>
                </div>
                <div class="level-right" style={{}}>
                    <div class="level-item">
                        {
                            addPieceButton()
                        }
                    </div>
                </div>
            </nav>

            <nav class="level">
                <div class="level-left" style={{}}>
                    {
                        favoriteState ? (
                            <button className="button is-rounded is-warning"
                                onClick={() => {
                                    setFavoriteState(false)
                                }}>
                                View Favorites
                            </button>
                        ) :
                            (
                                <button className="button is-rounded is-warning"
                                    onClick={() => {
                                        setFavoriteState(true)
                                    }}>
                                    View All
                                </button>
                            )
                    }
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-small is-warning is-rounded mt-5"
                            onClick={() => {
                                setSelectedArtType(0)
                                setSelectedSubType(0)
                                setSelectedMedium(0)
                            }}>
                            Reset All
                        </button>

                    </div>
                    <div class="level-item">
                        <PieceByArtType setSelectedArtType={setSelectedArtType} selectedArtType={selectedArtType} />
                    </div>
                    <div class="level-item">
                        <PieceBySubType setSelectedSubType={setSelectedSubType} selectedArtType={selectedArtType} selectedSubType={selectedSubType} />
                    </div>
                    <div class="level-item">
                        <PieceByMedium setSelectedMedium={setSelectedMedium} selectedMedium={selectedMedium} />
                    </div>
                </div>
            </nav>
        </div>
        <PieceFeed
            favoriteState={favoriteState}
            selectedSubType={selectedSubType}
            selectedArtType={selectedArtType}
            selectedMedium={selectedMedium}
        />
    </>
}