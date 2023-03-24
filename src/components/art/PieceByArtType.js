import { useEffect, useState } from "react";
import { getAllArtTypes } from "../../managers/arttypes";
import "./art.css"

export const PieceByArtType = ({ selectedArtType, setSelectedArtType }) => {
    const [artTypes, setArtTypes] = useState([]);

    useEffect(
        () => {
            getAllArtTypes().then((data) => setArtTypes(data))
        }, [])

    return (
        <><section className="posts__dropdown">
            <label htmlFor="arttypes">Primary Art Type</label><br></br>
            <select value={selectedArtType} onChange={(event) => { setSelectedArtType(parseInt(event.target.value)) }}>
                <option value="0" name="arttype_id" className="form-control" >View All</option>
                {artTypes.map(arttype => (
                    <option key={`arttype--${arttype.id}`} value={arttype.id}>
                        {arttype.label}
                    </option>
                )
                )}
            </select>
            </section>
        </>
    )
}