import { getAllArtTypes } from "../../managers/arttypes"
import { createArtSubRelationship, getAllSubTypes, getSubTypesByArtypeId } from "../../managers/subtypes"
import { getAllMediums } from "../../managers/mediums"
import { getAllSurfaces } from "../../managers/surfaces"
import { useEffect, useState } from "react"
import { addNewPiece } from "../../managers/Art"
import { useNavigate } from "react-router-dom"



export const AddPieceForm = ({ token }) => {
    const navigate = useNavigate()
    const [pieceSubTypes, setPieceSubTypes] = useState(new Set())
    const [piece, setNewPiece] = useState({
        title: "",
        subtitle: "",
        about: "",
        artTypeId: 0,
        subtypes: [],
        mediaId: 0,
        surfaceId: 0,
        image_url: "",
        length: 0,
        width: 0,
        height: null,
        weight: null,
        available_purchase: false,
        available_show: false,
        will_ship: false,
        unique: false,
        qty_available: 0,
        price: 0,
        private: false
    })

    const [arttypes, setArtTypes] = useState([])
    const [subtypes, setSubTypes] = useState([])
    const [filteredSubTypes, setFilteredSubTypes] = useState([])
    const [mediums, setMediums] = useState([])
    const [surfaces, setSurfaces] = useState([])

    const handleNewPieceInfo = (event) => {
        const newPiece = Object.assign({}, piece)
        newPiece[event.target.name] = event.target.value
        setNewPiece(newPiece)
    }

    useEffect(
        () => {
            getAllArtTypes().then((data) => setArtTypes(data))
            getAllSubTypes().then((data) => setSubTypes(data))
            getAllMediums().then((data) => setMediums(data))
            getAllSurfaces().then((data) => setSurfaces(data))
            setFilteredSubTypes(subtypes)
        }, [])

    const subtypeArr = (subtypeId) => {
        let copy = new Set(pieceSubTypes)
        copy.has(subtypeId) ? copy.delete(subtypeId) : copy.add(subtypeId)
        setPieceSubTypes(copy)
    }

    const saveNewPiece = () => {
        const mediaId = parseInt(piece.mediaId)
        const arttypeId = parseInt(piece.artTypeId)
        
        if (mediaId === 0) {
            window.alert("Please select a medium.")
        } else if (arttypeId === 0) {
                window.alert("Please select a primary art type.")
        } else {
            addNewPiece({
                title: piece.title,
                subtitle: piece.subtitle,
                about: piece.about,
                artTypeId: arttypeId,
                mediaId: mediaId,
                surfaceId: parseInt(piece.surfaceId),
                image_url: piece.image_url,
                length: piece.length,
                width: piece.width,
                height: piece.height,
                weight: piece.weight,
                available_purchase: piece.available_purchase,
                available_show: piece.available_show,
                will_ship: piece.will_ship,
                unique: piece.unique,
                qty_available: piece.qty_available,
                price: piece.price,
                private: piece.private,
                subtypes: Array.from(pieceSubTypes)
            })
                .then((res) => res.json())
                .then(() => navigate("/portfolio"))
        }
    }

    return (<>
        <div className="art__page_header">
            <h1 className="title is-1">add piece</h1>
        </div>
        <div className="art__container">
            <form className="addNewPieceForm">
                <fieldset>
                    <div className="form-group">
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            required autoFocus
                            className="title-form-control"
                            placeholder="Title"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">Subtitle</label>

                        <input
                            type="text"
                            name="subtitle"
                            required
                            className="image-form-control"
                            placeholder="Subtitle"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">About the piece</label>

                        <textarea type="textbox" rows="10" cols="75" name="about" required autoFocus className="form-control" placeholder="About" onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <label className="label">Primary Art Type</label>
                    <div className="form-group">
                        <select
                            name="artTypeId"
                            className="form-control"
                            value={piece.artTypeId}
                            onChange={(event) => {
                                getSubTypesByArtypeId(event.target.value).then((data) => setFilteredSubTypes(data))
                                const copy = { ...piece }
                                copy.artTypeId = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            <option value="0">Art Type:</option>
                            {arttypes.map(arttype => (
                                <option
                                    key={`category--${arttype.id}`}
                                    value={arttype.id}>
                                    {arttype.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="field">
                        <label className="label">Subtype</label>
                        <select
                            multiple
                            name="subTypeId"
                            className="form-control"
                            value={piece.subTypeId}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.subTypeId = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            <option value="0">Sub Art Category:</option>
                            {
                                filteredSubTypes.map(subtype => (

                                    <option
                                        key={`subtype--${subtype.id}`}
                                        onClick={() => subtypeArr(subtype.id)}
                                        value={subtype.id}>
                                        {subtype.label}
                                    </option>

                                ))
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">Primary Media</label>

                        <select
                            name="mediaId"
                            className="form-control"
                            value={piece.mediaId}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.mediaId = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            <option value="0">Primary Media Used:</option>
                            {mediums.map(media => (
                                <option
                                    key={`category--${media.id}`}
                                    value={media.id}>
                                    {media.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">Surface (optional)</label>

                        <select
                            name="surfaceId"
                            className="form-control"
                            value={piece.surfaceId}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.surfaceId = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            <option value="0">Surface (optional):</option>
                            {surfaces.map(surface => (
                                <option
                                    key={`category--${surface.id}`}
                                    value={surface.id}>
                                    {surface.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">Piece dimensions</label>

                        <input
                            type="text"
                            name="length"
                            required
                            className="image-form-control"
                            placeholder="length (inches)"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="width"
                            required
                            className="image-form-control"
                            placeholder="width (inches)"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="height"
                            className="image-form-control"
                            placeholder="height (inches)"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="weight"
                            className="image-form-control"
                            placeholder="weight (pounds)"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="label">Image</label>

                        <input
                            type="text"
                            name="Image URL"
                            className="image-form-control"
                            placeholder="Image URL"
                            onChange={handleNewPieceInfo} />
                    </div>
                </fieldset>
                <label className="label">Details about how to share your piece:</label>

                <div className="field">
                    <input
                        name="purchase"
                        type="radio"
                        className="form-control"
                        checked={piece.available_purchase === true}
                        value={piece.available_purchase}
                        onClick={(event) => {
                            const copy = { ...piece }
                            copy.available_purchase ? copy.available_purchase = false : copy.available_purchase = true
                            setNewPiece(copy)
                        }}
                    />
                    <label className="tagLabel">Available to purchase?</label>
                </div>
                <div className="field">
                    <input
                        name="ship"
                        type="radio"
                        className="form-control"
                        checked={piece.will_ship === true}
                        value={piece.will_ship}
                        onClick={(event) => {
                            const copy = { ...piece }
                            copy.will_ship ? copy.will_ship = false : copy.will_ship = true
                            setNewPiece(copy)
                        }}
                    />
                    <label className="tagLabel">Will ship?</label>
                </div>
                <div className="field">
                    <input
                        name="show"
                        type="radio"
                        className="form-control"
                        checked={piece.available_show === true}
                        value={piece.available_show}
                        onClick={(event) => {
                            const copy = { ...piece }
                            copy.available_show ? copy.available_show = false : copy.available_show = true
                            setNewPiece(copy)
                        }}
                    />
                    <label className="tagLabel">Available to Show?</label>
                </div>
                <div className="field">
                    <input
                        name="unique"
                        type="radio"
                        className="form-control"
                        checked={piece.unique === true}
                        value={piece.unique}
                        onClick={(event) => {
                            const copy = { ...piece }
                            copy.unique ? copy.unique = false : copy.unique = true
                            setNewPiece(copy)
                        }}
                    />
                    <label className="tagLabel">Unique Piece?</label>
                </div>
                <div className="field">
                    <input
                        name="unique"
                        type="radio"
                        className="form-control"
                        checked={piece.private === true}
                        value={piece.private}
                        onClick={(event) => {
                            const copy = { ...piece }
                            copy.private ? copy.private = false : copy.private = true
                            setNewPiece(copy)
                        }}
                    />
                    <label className="tagLabel">Private</label>
                </div>
                <div className="form-group">
                    <label className="label">Quantity Available</label>

                    <input
                        type="number"
                        name="quantity"
                        className="image-form-control"
                        placeholder="Qty Available"
                        onChange={(event) => {
                            const copy = { ...piece }
                            copy.quantity = parseInt(event.target.value)
                            setNewPiece(copy)
                        }} />
                </div>
                <div className="form-group">
                    <label className="label">Price</label>

                    <input
                        type="number"
                        name="price"
                        className="image-form-control"
                        placeholder="$000.00"
                        onChange={(event) => {
                            const copy = { ...piece }
                            copy.price = parseInt(event.target.value)
                            setNewPiece(copy)
                        }} />
                </div>

                <button type="publish" className="publishFormButton"
                onClick={evt => {
                        evt.preventDefault()
                        saveNewPiece()
                    }}
                >
                    Save Piece
                </button>
            </form >
        </div>
    </>)
}