import { getAllArtTypes } from "../../managers/arttypes"
import { getAllSubTypes, getSubTypesByArtypeId } from "../../managers/subtypes"
import { getAllMediums } from "../../managers/mediums"
import { getAllSurfaces } from "../../managers/surfaces"
import { useEffect, useState } from "react"
import { addNewPiece, getSinglePiece, updatePiece } from "../../managers/Art"
import { useNavigate, useParams } from "react-router-dom"

export const AddPieceForm = ({ }) => {
    const navigate = useNavigate()
    const [selectedSubTypes, setSelectedSubTypes] = useState([])
    const [piece, setNewPiece] = useState({
        title: "",
        subtitle: "",
        about: "",
        arttype: 0,
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

    return (
        <section class="container mt-6 ">
            <div class="box block">
                <div className="container block">
                    <button className="button is-link is-rounded is-small is-light" onClick={() => { navigate("/art") }}>
                        {`<<    Back`}
                    </button>
                    <div className="art__page_header">
                        <h1 className="title is-1">add art piece</h1>
                    </div>
                    <div className="art__container">
                        <fieldset>
                            <div className="field-body">
                                <div className="field-body">
                                    <label className="label" width>Title</label>
                                </div>
                                <div className="field-body">
                                    <label className="label" width>Subtitle</label>
                                </div>

                            </div>
                            <div className="field">
                                <div className="control is-expanded">
                                    <div className="field-body">
                                        <div className="field">
                                            <p className="control is-expanded">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Title"
                                                    onChange={handleNewPieceInfo}
                                                />
                                            </p>
                                        </div>

                                        <div className="field">
                                            <p className="control is-expanded">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="subtitle"
                                                    placeholder="Subtitle"
                                                    onChange={handleNewPieceInfo}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="label">About the piece</label>
                                <textarea
                                    type="textarea"
                                    rows="10"
                                    cols="75"
                                    name="about"
                                    required autoFocus
                                    className="input"
                                    placeholder="About"
                                    onChange={handleNewPieceInfo}
                                />
                            </div>
                            <label className="label">Primary Art Type</label>
                            <div class="select is-primary">
                                <select
                                    name="arttype"
                                    className="is-size-5"
                                    value={piece.arttype}
                                    onChange={(event) => {
                                        getSubTypesByArtypeId(event.target.value).then((data) => setFilteredSubTypes(data))
                                        const copy = { ...piece }
                                        copy.arttype = parseInt(event.target.value)
                                        setNewPiece(copy)
                                    }}>
                                    <option value="0">Select Primary Art Type</option>
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
                                <label className="label mt-4">Subtype (one or more)</label>
                                <div class="select is-primary">
                                    <select
                                        multiple={true}
                                        name="subtype"
                                        className="is-size-5 select is-multiple is-primary mb-6"
                                        value={selectedSubTypes}
                                        onChange={(e) => {
                                            const options = [...e.target.selectedOptions]
                                            const values = options.map(option => parseInt(option.value))
                                            setSelectedSubTypes(values)
                                        }}>
                                        <option value="0">Sub Art Category:</option>
                                        {
                                            filteredSubTypes.map(subtype => (
                                                <option
                                                    key={`subtype--${subtype.id}`}
                                                    value={subtype.id}>
                                                    {subtype.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <label className="label mt-6">Primary Media</label>
                            <div className="select is-primary is-size-5">
                                <select
                                    name="media"
                                    className="form-control"
                                    value={piece.media}
                                    onChange={(event) => {
                                        const copy = { ...piece }
                                        copy.media = parseInt(event.target.value)
                                        setNewPiece(copy)
                                    }}>
                                    <option value="0">Select a medium:</option>
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
                            <div className="select is-primary is-size-5 mb-5">
                                <select
                                    name="surface"
                                    className="form-control"
                                    value={piece.surface}
                                    onChange={(event) => {
                                        const copy = { ...piece }
                                        copy.surface = parseInt(event.target.value)
                                        setNewPiece(copy)
                                    }}>
                                    <option value="0">Select a surface:</option>
                                    {surfaces.map(surface => (
                                        <option
                                            key={`category--${surface.id}`}
                                            value={surface.id}>
                                            {surface.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br></br>
                            <label className="title mt-6">Piece dimensions</label>
                            <div className="">
                                <fieldset>
                                    <div className="field-body">
                                        <div className="field-body">
                                            <label className="label" width>Length (inches)</label>
                                        </div>
                                        <div className="field-body">
                                            <label className="label" width>Width (inches)</label>
                                        </div>

                                    </div>
                                    <div className="field">
                                        <div className="control is-expanded">
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="length"
                                                            placeholder="length (inches)"
                                                            value={piece.length}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>

                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="width"
                                                            placeholder="width (inches)"
                                                            value={piece.width}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field-body">
                                        <div className="field-body">
                                            <label className="label" >Height (inches)</label>
                                        </div>
                                        <div className="field-body">
                                            <label className="label" width>Weight (pounds)</label>
                                        </div>

                                    </div>
                                    <div className="field">
                                        <div className="control is-expanded">
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="height"
                                                            placeholder="height (inches)"
                                                            value={piece.height}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>

                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="weight"
                                                            placeholder="weight (weight)"
                                                            value={piece.weight}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field-body">
                                        <div className="field-body">
                                            <label className="label">Image URL</label>
                                        </div>
                                        
                                    </div>
                                    <div className="field">
                                        <div className="control is-expanded">
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="image_url"
                                                            placeholder="Image URL"
                                                            value={piece.image_url}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div>

                            <br></br>
                            <label className="title mt-6">Details about your art piece</label>
                                    
                            
                                    <div className="field">
                                        <input
                                            name="purchase"
                                            type="checkbox"
                                            className="form-control"
                                            checked={piece.available_purchase === true}
                                            value={piece.available_purchase}
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
                                            type="checkbox"
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
                                            type="checkbox"
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
                                            type="checkbox"
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
                                            type="checkbox"
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
                                    <div className="field-body">
                                        <div className="field-body">
                                            <label className="label" >Quantity Available</label>
                                        </div>
                                        <div className="field-body">
                                            <label className="label" width>Price</label>
                                        </div>

                                    </div>
                                    <div className="field">
                                        <div className="control is-expanded">
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            name="qty_available"
                                                            placeholder="Quantity"
                                                            value={piece.qty_available}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>

                                                <div className="field">
                                                    <p className="control is-expanded">
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Price"
                                                            name="price"
                                                            value={piece.price}
                                                            onChange={handleNewPieceInfo} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button type="publish"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let copy = { ...piece }
                                            copy.subtypes = selectedSubTypes
                                            addNewPiece(copy).then(() => navigate("/portfolio"))
                                        }
                                        }
                                        className="button is-rounded is-link is-small" style={{ margin: "1rem" }}
                                    >Submit
                                    </button>
                                    <button type="publish"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            navigate("/portfolio")
                                        }}
                                        className="button is-rounded is-danger is-light is-small" style={{ margin: "1rem" }}
                                    >Cancel
                                    </button>
                                </fieldset>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </section>
    );
};