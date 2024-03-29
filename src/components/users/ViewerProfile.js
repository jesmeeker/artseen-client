import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCities } from "../../managers/Cities"
import { getCurrentViewer, updateViewer } from "../../managers/Users"
import "./users.css"



export const ViewerProfile = ({ token }) => {
    const [changed, setChanged] = useState(false);
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState()
    const [user, setUser] = useState({
        user: {},
        city: {},
        phone_number: 0
    })

    const [tempUser, setTempUser] = useState({
        user: {},
        city: {
            id: selectedCity
        },
        phone_number: 0
    })

    useEffect(() => {
        getCities().then(data => setCities(data))
    }, [])

    useEffect(() => {
        getCurrentViewer().then((data) => {
            setUser(data[0])
            setTempUser(data[0])
        })
    }, [])

    const handleSave = (e) => {
        updateViewer(tempUser.id, tempUser)
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
            <div className="container">



                <div class="tile is-parent is-8">
                    <article class="tile is-child">
                        <form
                            className="art__container"
                            id="artist"
                            onSubmit={updateViewer}
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
                                        id="phone_number"
                                        type="text"
                                        value={tempUser.phone_number}
                                        onChange={(e) => {
                                            const copy = { ...tempUser }
                                            copy.phone_number = (e.target.value)
                                            setChanged(true);
                                            setTempUser(copy);
                                        }}
                                    />
                                    </p>
                                    <p className="title">city: <select
                                    className="title profile__input"
                                    id="city"
                                    type="text"
                                    value={tempUser?.city?.id}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setSelectedCity(parseInt(e.target.value));
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
                <article class="container">
                    <div class="tile is-parent is-8">
                        <article class="tile is-child">
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
                </article>
            </div>
        </>
    );
}