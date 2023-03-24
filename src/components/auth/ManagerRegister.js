import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { getCities } from "../../managers/Cities"
import { getGalleries, getGalleriesByCityId } from "../../managers/Galleries"

export const ManagerRegister = ({ setRegisterState })  => {
    const [cities, setCities] = useState([])
    const [galleries, setGalleries] = useState([])
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))

    const [filteredGalleries, setFilteredGalleries] = useState([])
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const city = useRef()
    const gallery = useRef()
    const phone = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getCities().then(data => setCities(data))
        getGalleries().then(data => setGalleries(data))
        setFilteredGalleries(galleries)
    }, [])

    const setToken = (newToken, permissions) => {
        localStorage.setItem('artseen_token', newToken)
        localStorage.setItem('permissions', permissions)
        setTokenState(newToken)
    }

    const closeModal = ($el) => {
        $el.classList.remove('is-active')
        ;
    }
    const closeAllModals = () => {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()
        //confirms password and verifyPassword are the same value and data type
        if (password.current.value === verifyPassword.current.value) {
            //initializes newUser to meet the requirements of the User class for POST request
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                gallery_id: gallery.current.value,
                city_id: city.current.value,
                phone: phone.current.value
            }
            registerUser("manager", newUser).then((res) => {
                if ("token" in res) {
                    setToken(res.token, res.permissions)
                    closeAllModals()
                    navigate("/art")
                }
            })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <div class="modal-content">
            <div class="box">
                <div className=".container">
                <button className="button is-link is-rounded is-small is-light" onClick={() => {setRegisterState("register")}}>
                                {`<<    Back`}
                            </button>
                    <h1 className="title">Gallery Manager Registration</h1>
                    <p className="subtitle">Create an account</p>
                    <div className="field-body">
                        <div className="field-body">
                            <label className="label" width>First Name</label>
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
                                            placeholder="First Name"
                                            ref={firstName}
                                        />
                                    </p>
                                </div>

                                <div className="field">
                                    <p className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Last Name"
                                            ref={lastName}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="field-body">
                            <textarea
                                className="input"
                                placeholder="Username"
                                ref={username}
                            ></textarea>
                        </div>
                    </div>

                    <div className="field-body">
                        <div className="field-body">
                            <label className="label" width>Email</label>
                        </div>
                        <div className="field-body">
                            <label className="label">Phone No.</label>
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
                                            placeholder="Email"
                                            ref={email}
                                        />
                                    </p>
                                </div>

                                <div className="field">
                                    <p className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="(XXX) XXX-XXXX"
                                            ref={phone}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Password"
                                        ref={password}
                                    />
                                </p>
                            </div>

                            <div className="field">
                                <p className="control is-expanded">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Verify Password"
                                        ref={verifyPassword}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Primary City</label>
                        <select
                            name="cityId"
                            className="select subtitle"
                            ref={city}
                            onChange={(event) => {
                                getGalleriesByCityId(event.target.value).then((data) => setFilteredGalleries(data))
                            }}
                        >
                            <option value="0">City Select</option>
                            {cities.map(city => (
                                <option
                                    key={`city--${city.id}`}
                                    value={city.id}>
                                    {city.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Affiliated Gallery</label>
                        <select
                            name="galleryId"
                            className="select subtitle register__select register__input"
                            ref={gallery}
                        >
                            <option value="0">Gallery Select</option>
                            {filteredGalleries.map(gallery => (
                                <option
                                    key={`city--${gallery.id}`}
                                    value={gallery.id}>
                                    {gallery.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                    <div className="field is-grouped">
                    <div className="modal-cancel">
                        <button className="button is-link is-danger is-rounded">
                                Cancel
                            </button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-rounded" onClick={handleRegister}>
                                Submit
                            </button>
                        </div>
                        
                    </div>
            </div>
            </div>
            )
}
