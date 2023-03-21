import { useState } from "react"
import { ArtistRegister } from "./ArtistRegister"
import { ManagerRegister } from "./ManagerRegister"
import { ViewerRegister } from "./ViewerRegister"

export const Register = ({ setToken, registerState, setRegisterState, token }) => {
    const [selectedOption, setSelectedOption] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        setRegisterState(selectedOption)
    }

    const ViewToDisplay = () => {
        if (registerState === "register") {
            return <>
                <div class="modal-content">
                    <div class="box">
                        <div className=".container">
                            <p className="title">What type of account do you want to sign up for?</p>
                            <fieldset>

                                <input
                                    type="radio"
                                    name="account"
                                    value="artist"
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value)
                                    }
                                    }
                                />

                                <label htmlFor="Artist">I'm an artist.</label>
                                <input
                                    type="radio"
                                    name="account"
                                    value="viewer"
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value)
                                    }
                                    }
                                />

                                <label htmlFor="Artist">I'm an art enthusiast.</label>
                                <input
                                    type="radio"
                                    name="account"
                                    value="manager"
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value)
                                    }
                                    }
                                />
                                <label htmlFor="Manager">I'm a gallery manager/owner.</label>
                            </fieldset>
                            <div className="level">
                                <div className="level-item">
                                    <button className="level-left modal-cancel button is-rounded is-danger is-light is-small" data-target="modal-js-example">
                                        Cancel
                                    </button>
                                </div>
                                <div className="level-item">
                                    <button className="level-right js-modal-trigger button is-rounded is-info is-small" data-target="modal-js-example"
                                        onClick={(e) => {
                                            handleSubmit(e)
                                        }
                                        }>
                                        {`Next   >>`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }

        else if ((registerState === "artist")) {
            return <>
                <ArtistRegister setToken={setToken} setRegisterState={setRegisterState} />
            </>
        } else if ((registerState === "viewer")) {
            return <>
                <ViewerRegister setToken={setToken} setRegisterState={setRegisterState} />
            </>
        } else if ((registerState === "manager")) {
            return <>
                <ManagerRegister setToken={setToken} setRegisterState={setRegisterState} />
            </>
        }
    }

    return <>
        {
            ViewToDisplay()
        }
    </>

}