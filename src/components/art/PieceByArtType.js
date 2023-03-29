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
            

            <label htmlFor="arttypes">Filter By Art Type</label><br></br>
            <div class="select">
             
            <select value={selectedArtType} onChange={(event) => { setSelectedArtType(parseInt(event.target.value)) }}>
                <option value="0" name="arttype_id" className="form-control" >View All</option>
                {artTypes.map(arttype => (
                    <option key={`arttype--${arttype.id}`} value={arttype.id}>
                        {arttype.label}
                    </option>
                )
                )}
            </select>
            </div>
            </section>
        </>
    )
}