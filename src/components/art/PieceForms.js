import { getAllArtTypes } from "../../managers/arttypes"
import { getAllSubTypes, getSubTypesByArtypeId } from "../../managers/subtypes"
import { getAllMediums } from "../../managers/mediums"
import { getAllSurfaces } from "../../managers/surfaces"
import { useEffect, useState } from "react"
import { addNewPiece, getSinglePiece, updatePiece } from "../../managers/Art"
import { useNavigate, useParams } from "react-router-dom"

export const PieceForms = ({ token }) => {
    const navigate = useNavigate()
    const { pieceId } = useParams()
    const [pieceSubTypes, setPieceSubTypes] = useState(new Set())
    const [piece, setNewPiece] = useState({
        title: "",
        subtitle: "",
        about: "",
        arttype: 0,
        subtypes: [],
        media: 0,
        surface: null,
        image_url: "",
        length: null,
        width: null,
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

    useEffect(() => {
        getAllArtTypes().then((data) => setArtTypes(data))
        getAllSubTypes()
            .then((data) => {
                setSubTypes(data)
                setFilteredSubTypes(data)
            })
        getAllMediums().then((data) => setMediums(data))
        getAllSurfaces().then((data) => setSurfaces(data))

    }, [])

    useEffect(() => {
        if (pieceId) {
            getSinglePiece(pieceId)
                    .then((data) => {
                        data.arttype = parseInt(data.arttype.id)
                        data.surface = parseInt(data.surface?.id)
                        data.media = parseInt(data.media.id)
                        setNewPiece(data)

                        let copy = new Set(pieceSubTypes)
                        for (const subtype of data.subtypes) {
                            copy.add(subtype.id)
                        setPieceSubTypes(copy)
                        }}
                    )
        }
        }, [pieceId])

    

    const subtypeArr = (subtype) => {
        let copy = new Set(pieceSubTypes)
        copy.has(subtype) ? copy.delete(subtype) : copy.add(subtype)
        setPieceSubTypes(copy)
    }

    return (
        <form className="addNewPieceForm">
            <div className="art__page_header">{
                pieceId ? <h1 className="title is-1">edit piece</h1> : <h1 className="title is-1">add piece</h1>
            }
        </div>
            <div className="art__container">
                <fieldset>
                    <div className="form-group">
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            required autoFocus
                            className="title-form-control"
                            placeholder="Title"
                            defaultValue={piece.title}
                            onChange={handleNewPieceInfo} />
                    </div>
                    <div className="form-group">
                        <label className="label">Subtitle</label>
                        <input
                            type="text"
                            name="subtitle"
                            required
                            className="subtitle-form-control"
                            placeholder="Subtitle"
                            defaultValue={piece.subtitle}
                            onChange={handleNewPieceInfo} />
                    </div>
                    <div className="form-group">
                        <label className="label">About the piece</label>
                        <textarea
                            type="textbox"
                            rows="10"
                            cols="75"
                            name="about"
                            required autoFocus
                            className="form-control"
                            placeholder="About"
                            defaultValue={piece.about}
                            onChange={handleNewPieceInfo}
                        />
                    </div>
                    <label className="label">Primary Art Type</label>
                    <div className="form-group">
                        <select
                            name="arttype"
                            className="form-control"
                            defaultValue={piece.arttype}
                            onChange={(event) => {
                                getSubTypesByArtypeId(event.target.value).then((data) => setFilteredSubTypes(data))
                                const copy = { ...piece }
                                copy.arttype = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            {arttypes.map(arttype => (
                                <option
                                    key={`category--${arttype.id}`}
                                    value={arttype.id}>
                                    {arttype.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Subtype</label>
                        <select
                            multiple
                            name="subType"
                            className="form-control"
                            defaultValue={piece.subtypes}
                            onClick={(event) => {
                                const copy = { ...piece }
                                copy.subType = parseInt(event.target.value)
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
                    <label className="label">Primary Media</label>
                    <div className="form-group">
                        <select
                            name="media"
                            className="form-control"
                            defaultValue={piece.media}
                            // defaultValue={piece.media}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.media = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            {mediums.map(media => (
                                <option
                                    key={`category--${media.id}`}
                                    value={media.id}>
                                    {media.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="label">Surface (optional)</label>
                    <div className="form-group">
                        <select
                            name="surface"
                            className="form-control"
                            defaultValue={piece.surface}
                            // defaultValue={piece.surface}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.surface = parseInt(event.target.value)
                                setNewPiece(copy)
                            }}>
                            {surfaces.map(surface => (
                                <option
                                    key={`category--${surface.id}`}
                                    value={surface.id}>
                                    {surface.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="label">Piece dimensions</label>
                    <div className="form-group">
                        <div>
                            <input
                                type="number"
                                name="length"
                                required
                                placeholder="length (inches)"
                                defaultValue={piece.length}
                                onChange={handleNewPieceInfo} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <input
                                type="number"
                                name="width"
                                placeholder="width (inches)"
                                defaultValue={piece.width}
                                onChange={handleNewPieceInfo} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <input
                                type="number"
                                name="height"

                                placeholder="height (inches)"
                                defaultValue={piece.height}
                                onChange={handleNewPieceInfo} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <input
                                type="text"
                                name="weight"
                                placeholder="weight (pounds)"
                                defaultValue={piece.weight}
                                onChange={handleNewPieceInfo} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Image</label>
                        <input
                            type="text"
                            name="image_url"
                            className="image-form-control"
                            placeholder="Image URL"
                            defaultValue={piece.image_url}
                            onChange={handleNewPieceInfo} />
                    </div>
                    <label className="label">Details about how to share your piece:</label>
                    <div className="field">
                        <input
                            name="purchase"
                            type="radio"
                            className="form-control"
                            checked={piece.available_purchase === true}
                            value={piece.available_purchase}
                            // defaultValue={piece.available_purchase}
                            onChange={(event) => {
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
                            onChange={(event) => {
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
                            onChange={(event) => {
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
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.unique ? copy.unique = false : copy.unique = true
                                setNewPiece(copy)
                            }}
                        />
                        <label className="tagLabel">Unique Piece?</label>
                    </div>
                    <div className="field">
                        <input
                            name="private"
                            type="radio"
                            className="form-control"
                            checked={piece.private === true}
                            value={piece.private}
                            onChange={(event) => {
                                const copy = { ...piece }
                                copy.private ? copy.private = false : copy.private = true
                                setNewPiece(copy)
                            }}
                        />
                        <label className="tagLabel">Private</label>
                    </div>
                    <label className="label">Quantity Available</label>
                    <div className="form-group">
                        <div>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Qty Available"
                                value={piece.quantity_available}
                                onChange={(event) => {
                                    const copy = { ...piece }
                                    copy.quantity_available = parseInt(event.target.value)
                                    setNewPiece(copy)
                                }} />
                        </div>
                    </div>
                    <label className="label">Price</label>
                    <div className="form-group">
                        <div>
                            <input
                                type="number"
                                name="price"
                                placeholder="$000.00"
                                value={piece.price}
                                onChange={(event) => {
                                    const copy = { ...piece }
                                    copy.price = parseInt(event.target.value)
                                    setNewPiece(copy)
                                }} />
                        </div>
                    </div>
                    <button type="publish"
                        onClick={(e) => {
                            e.preventDefault()
                            if (pieceId) {
                                let copy = { ...piece }
                                copy.subtypes = Array.from(pieceSubTypes)
                                updatePiece(copy.id, copy).then(() => navigate("/portfolio"))
                            } else {
                                let copy = { ...piece }
                                copy.subtypes = Array.from(pieceSubTypes)
                                addNewPiece(copy).then(() => navigate("/portfolio"))
                            }
                        }
                        }
                        className="button is-rounded is-link is-small"
                    >Submit
                    </button>
                </fieldset>
            </div>
        </form>
    );
};