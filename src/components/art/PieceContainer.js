import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSearchedArt } from "../../managers/Art"
import { PieceByArtType } from "./PieceByArtType"
import { PieceByMedium } from "./PieceByMedium"
import { PieceBySubType } from "./PieceBySubType"
import { PieceFeed } from "./PieceFeed"
import "./art.css";

export const PieceContainer = () => {
    const [selectedArtType, setSelectedArtType] = useState(0)
    const [selectedSubType, setSelectedSubType] = useState(0)
    const [selectedMedium, setSelectedMedium] = useState(0)

    const navigate = useNavigate()

    // const handleKeypress = (e) => {
    //     if (e.keyCode === 13) {
    //         handleSubmit()
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     getSearchedArt(`${searchTerms}`).then((data) => setFilteredArt(data))
    //     setSearchTerms("Search by Title, Artist, Medium, Art Type")
    //     document.getElementById("search").value = ""
    // }

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
                        <button className="button is-rounded is-link" onClick={() => navigate("add")}>
                            +Add Piece
                        </button>
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

        <PieceFeed
            selectedSubType={selectedSubType}
            selectedArtType={selectedArtType}
            selectedMedium={selectedMedium}
        />
    </>
}