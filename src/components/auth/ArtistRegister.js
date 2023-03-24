import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { getCities } from "../../managers/Cities"

export const ArtistRegister = ({ setRegisterState }) => {
    const [cities, setCities] = useState([])
    const [token, setTokenState] = useState(localStorage.getItem('artseen_token'))
    
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const profileImage = useRef()
    const city = useRef()
    const phone = useRef()
    const website = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getCities().then(data => setCities(data))
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
        if (password.current.value === verifyPassword.current.value) {

            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                bio: bio.current.value,
                image_url: profileImage.current.value,
                city_id: city.current.value,
                phone: phone.current.value,
                website: website.current.value,
            }
            registerUser("artist", newUser).then((res) => {
                if ("token" in res) {
                    setToken(res.token, res.permissions)
                    closeAllModals()
                    navigate("/")
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
                    <h1 className="title">Artist Registration</h1>
                    <p className="subtitle">Create an account</p>
                    <div className="field-body">
                        <div className="field-body">
                            <label className="label" width>First Name</label>
                        </div>
                        <div className="field-body">
                            <label className="label" width>Last Name</label>
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

                    <div className="field">
                        <label className="label">Bio</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder="Tell us about yourself..."
                                ref={bio}
                            ></textarea>
                        </div>
                    </div>

                    <div className="field-body">
                        <div className="field-body">
                            <label className="label" width>Profile Image</label>
                        </div>
                        <div className="field-body">
                            <label className="label">Website</label>
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
                                            placeholder="Profile Image URL"
                                            ref={profileImage}
                                        />
                                    </p>
                                </div>

                                <div className="field">
                                    <p className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Website URL"
                                            ref={website}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Primary City</label>
                        <select
                            name="cityId"
                            className="select"
                            ref={city}
                        >
                            <option value="0">Category Select</option>
                            {cities.map(city => (
                                <option
                                    key={`city--${city.id}`}
                                    value={city.id}>
                                    {city.label}
                                </option>
                            ))}
                        </select>
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
            </div>
            )
}
