import { useEffect, useState } from "react";
import { getAllSubTypes, getSubTypesByArtypeId } from "../../managers/subtypes";

export const PieceBySubType = ({ selectedArtType, setSelectedSubType }) => {
    const [subTypes, setSubTypes] = useState([]);
    const [filteredSubTypes, setFilteredSubTypes] = useState([]);

    useEffect(
        () => {
            getAllSubTypes().then((data) => {
                setSubTypes(data)
                setFilteredSubTypes(data)}
                )
            .then(() => {
                if (selectedArtType !== 0) {
                    getSubTypesByArtypeId(selectedArtType)
                        .then((data) => setFilteredSubTypes(data))
                }
            })
        }, [selectedArtType])

    return (
        <><section className="posts__dropdown">
            <label htmlFor="subtypes">Sub Type</label><br></br>
            <select onChange={(event) => { setSelectedSubType(parseInt(event.target.value)) }}>
                <option value="0" name="subtype" className="form-control" >View All</option>
                {filteredSubTypes.map(subtype => (
                    <option key={`subtype--${subtype.id}`} value={subtype.id}>
                        {subtype.label}
                    </option>
                )
                )}
            </select>
            </section>
        </>
    )
}