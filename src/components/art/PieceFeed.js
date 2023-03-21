import { useEffect, useState } from "react"
import { getAllArt } from "../../managers/Art"
import { Art } from "./Art"

export const PieceFeed = ({ token, selectedArtType, selectedSubType, selectedMedium }) => {
    const [art, setArt] = useState([])
    const [filteredArt, setFilteredArt] = useState([])

    useEffect(() => {
        getAllArt().then((data) => {
            setArt(data)
            setFilteredArt(data)
        })
    }, [])

    useEffect(() => {
        if (selectedArtType === 0 && selectedSubType === 0 && selectedMedium === 0) {
            setFilteredArt(art)
        }
        else if (selectedArtType !== 0 && selectedSubType === 0 && selectedMedium === 0) {
            const filteredCopy = art.filter(
                (a) => a.arttype.id === parseInt(selectedArtType)
            )
            setFilteredArt(filteredCopy)
        }
        else if (selectedArtType === 0 && selectedSubType !== 0 && selectedMedium === 0) {
            const filteredCopy = art.filter(a => a.subtypes.some(sub => sub.id === parseInt(selectedSubType)))
            setFilteredArt(filteredCopy)
        }
        else if (selectedArtType === 0 && selectedSubType === 0 && selectedMedium !== 0) {
            const filteredCopy = art.filter(
                (a) => a.media?.id === parseInt(selectedMedium)
            )
            setFilteredArt(filteredCopy)
        }
        else if (selectedArtType !== 0 && selectedSubType !== 0 && selectedMedium === 0) {
            const filteredCopy = art.filter(
                (a) =>
                (a.subtypes.filter(subtype => subtype.id === parseInt(selectedSubType)).length > 0 &&
                    a.arttype.id === parseInt(selectedArtType))
            )
            setFilteredArt(filteredCopy)
        }
        else if (selectedArtType !== 0 && selectedSubType === 0 && selectedMedium !== 0) {
            const filteredCopy = art.filter(
                (a) =>
                    a.media?.id === parseInt(selectedMedium) && a.arttype?.id === parseInt(selectedArtType)
            )
            setFilteredArt(filteredCopy)
        }
        else if (selectedArtType === 0 && selectedSubType !== 0 && selectedMedium !== 0) {
            const filteredCopy = art.filter(
                (a) =>
                    a.media?.id === parseInt(selectedMedium) && a.subtypes.filter(subtype => subtype.id === parseInt(selectedSubType)).length > 0
            )
            setFilteredArt(filteredCopy)
        }
    }, [art, selectedArtType, selectedSubType, selectedMedium])

    return (
        <>
            <div className="art__container">
                {filteredArt.map((art_piece) => (
                    <Art key={art_piece.id} art_piece={art_piece} token={token} setArt={setArt} state={"PieceFeed"} />
                ))}
            </div>
        </>
    )
}