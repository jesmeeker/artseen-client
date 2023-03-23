import { useEffect, useState } from "react"
import { getCities } from "../../managers/Cities";
import { getGalleries } from "../../managers/Galleries";
import { getCurrentManager, getCurrentUser, updateManager } from "../../managers/Users";
import "./users.css"

export const ManagerProfile = ({ token }) => {
    const [changed, setChanged] = useState(false);
    const [cities, setCities] = useState([])
    const [galleries, setGalleries] = useState([])
    const [user, setUser] = useState({
        user: {},
        city: {},
        gallery: {},
        phone_number: 0
    })

    const [tempUser, setTempUser] = useState({
        user: {},
        city: {},
        gallery: {},
        phone_number: 0
    })

    useEffect(() => {
        getCities().then(data => setCities(data))
        getGalleries().then(data => setGalleries(data))
    }, [])

    useEffect(() => {
        getCurrentManager().then((data) => {
            setUser(data[0])
            setTempUser(data[0])
        })
    }, [])

    const handleSave = (e) => {
        updateManager(tempUser.id, tempUser)
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
                    <div class="tile is-vertical">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <article class="tile is-child notification">
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
                                        onSubmit={updateManager}
                                    >
                                        <div className="form-group">
                                            <fieldset>
                                                <div className="title">first name:
                                                    <input
                                                        className="title profile__input"
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
                                                </div>
                                                <div className="title">last name:
                                                    <input
                                                        className="title profile__input"
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
                                                    className="title profile__input"
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
                                                <p className="title">phone: <input
                                                    className="title profile__input"
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
                                                    className="title profile__input"
                                                    id="city"
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
                                                <p className="title">gallery: <select
                                                    className="title profile__input"
                                                    id="gallery"
                                                    type="text"
                                                    value={tempUser.gallery.id}
                                                    onChange={(e) => {
                                                        const copy = { ...tempUser }
                                                        copy.gallery.id = parseInt(e.target.value)
                                                        setChanged(true);
                                                        setTempUser(copy);
                                                    }}
                                                >{galleries.map(gallery => (
                                                    <option
                                                        key={`gallery--${gallery.id}`}
                                                        value={gallery.id}>
                                                        {gallery.name}
                                                    </option>
                                                ))}
                                                </select>
                                                </p>
                                                <p className="title">username: <input
                                                    className="title profile__input"
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
                                            </fieldset>
                                        </div>
                                    </form>
                                </article>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            );
}