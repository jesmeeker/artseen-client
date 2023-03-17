import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCities } from "../../managers/Cities"
import { getCurrentUser, updateArtist } from "../../managers/Users"
import "./artist.css"



export const EditProfile = ({ token }) => {
    const [cities, setCities] = useState([])
    const [user, setUser] = useState({
        user: {},
        image_url: "",
        website: "",
        city: {},
        phone_number: 0,
        bio: ""
    })

    const [tempUser, setTempUser] = useState({
        user: {},
        image_url: "",
        website: "",
        city: {},
        phone_number: 0,
        bio: ""
    })
    
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        getCities().then(data => setCities(data))
    }, [])

    useEffect(() => {
        getCurrentUser().then((data) => {
            setUser(data[0])
            setTempUser(data[0])
        })
    }, [])

    const handleSave = (e) => {
        updateArtist(tempUser.id, tempUser)
        setChanged(false)
            .then((response) => {
                if (!response.ok) throw new Error('something went wrong');
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
    }

    return (
        <>
            <div className="art__container">
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child is-20">
                            <img className="_image" src={user.image_url} alt={user.image_url} />
                            {changed ? (
                                <div className="mb-2">
                                    <button
                                        className="button is-rounded is-link is-small is-danger is-light"
                                        onClick={(e) => {
                                            setChanged(false);
                                            setTempUser({ ...user });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        form="customer"
                                        className="button is-rounded is-link is-small"
                                        onClick={(e) => {
                                            handleSave()
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : null}
                        </article>
                    </div>

                    <div class="tile is-parent is-8">
                        <article class="tile is-child">
                            <form
                                className="art__container"
                                id="artist"
                                onSubmit={updateArtist}
                            >
                                <div className="form-group">
                               <fieldset>
                                        <div className="title">name:
                                            <input
                                                className="title firstname"
                                                id="firstname"
                                                type="text"
                                                value={tempUser.user.first_name}
                                                onChange={(e) => {
                                                    const copy = { ...tempUser }
                                                    copy.user.first_name = (e.target.value)
                                                    setChanged(true);
                                                    setTempUser(copy);
                                                }}
                                            />
                                            <input
                                                className="title"
                                                id="lastname"
                                                type="text"
                                                value={tempUser.user.last_name}
                                                onChange={(e) => {
                                                    const copy = { ...tempUser }
                                                    copy.user.last_name = (e.target.value)
                                                    setChanged(true);
                                                    setTempUser(copy);
                                                }}
                                            />
                                        </div>
                                        <p className="title">email:  <input
                                            className="title"
                                            id="email"
                                            type="text"
                                            value={tempUser.user.email}
                                            onChange={(e) => {
                                                const copy = { ...tempUser }
                                                copy.user.email = (e.target.value)
                                                setChanged(true);
                                                setTempUser(copy);
                                            }}
                                        /></p>
                                        <p className="title">website: <input
                                            className="title"
                                            id="website"
                                            type="text"
                                            value={tempUser.website}
                                            onChange={(e) => {
                                                const copy = { ...tempUser }
                                                copy.website = (e.target.value)
                                                setChanged(true);
                                                setTempUser(copy);
                                            }}
                                        />
                                        </p>
                                        <p className="title">phone: <input
                                            className="title"
                                            id="website"
                                            type="text"
                                            value={tempUser.phone_number}
                                            onChange={(e) => {
                                                const copy = { ...tempUser }
                                                copy.user.phone_number = (e.target.value)
                                                setChanged(true);
                                                setTempUser(copy);
                                            }}
                                        />
                                        </p>
                                        <p className="title">city: <select
                                            className="title"
                                            id="website"
                                            type="text"
                                            value={tempUser.city.id}
                                            onChange={(e) => {
                                                const copy = { ...tempUser }
                                                copy.city.id = parseInt(e.target.value)
                                                setChanged(true);
                                                setTempUser(copy);
                                            }}
                                        >{cities.map(city => (
                                            <option
                                                key={`city--${city.id}`}
                                                value={city.id}>
                                                {city.label}
                                            </option>
                                        ))}
                                    </select>
                                        </p>
                                        <p className="title">username: <input
                                            className="title"
                                            id="username"
                                            type="text"
                                            value={tempUser.user.username}
                                            onChange={(e) => {
                                                const copy = { ...tempUser }
                                                copy.user.username = (e.target.value)
                                                setChanged(true);
                                                setTempUser(copy);
                                            }}
                                        />
                                        </p>
                                        <p className="title">bio:
                                            <textarea
                                                className="title textbox"
                                                id="bio"
                                                type="textbox"
                                                value={tempUser.bio}
                                                onChange={(e) => {
                                                    const copy = { ...tempUser }
                                                    copy.bio = (e.target.value)
                                                    setChanged(true);
                                                    setTempUser(copy);
                                                }}
                                            />
                                        </p>
                                    </fieldset>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <br />
             </>
    );
}
