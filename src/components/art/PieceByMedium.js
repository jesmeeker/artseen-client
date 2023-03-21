import { useEffect, useState } from "react";
import { getAllMediums } from "../../managers/mediums";
import "./art.css"

export const PieceByMedium = ({ setSelectedMedium }) => {
    const [mediums, setMediums] = useState([]);

    useEffect(
        () => {
            getAllMediums().then((data) => setMediums(data))
        }, [])

    return (
        <><section className="posts__dropdown">
            <label htmlFor="mediums">Medium</label><br></br>
            <select onChange={(event) => { setSelectedMedium(parseInt(event.target.value)) }}>
                <option value="0" name="media_id" className="form-control" >View All</option>
                {mediums.map(media => (
                    <option key={`media--${media.id}`} value={media.id}>
                        {media.label}
                    </option>
                )
                )}
            </select>
            </section>
        </>
    )
}