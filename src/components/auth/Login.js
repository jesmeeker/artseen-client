import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

//Login function handles initializing user object, posting user to login table, and conditionally rendering JSX
export const Login = ({ token, setToken }) => {
    //useRef hook is a state variable that 1. persists between renders and 2. can change but doesn't instigate re-renders.
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }

        loginUser(user)
            .then(res => {

                if ("valid" in res && res.valid && "token" in res) {
                    
                    setToken(res.token, res.permissions)
                    navigate("/art")
                }
                else {
                    //Used to generate a string on the form "Username or password not valid"
                    setisUnsuccessful(true)
                }
            })
    }

    return (
        <section className="columns is-centered">
            {/*login form*/}
            <form className="column is-two-thirds" onSubmit={handleLogin}>
                <h1 className="title">ArtSeen</h1>
                <p className="subtitle">Please sign in</p>

                <div className="field">
                    <label className="subtitle">Username</label>
                    <div className="control">
                        <input className="input" type="text" ref={username} />
                    </div>
                </div>

                <div className="field">
                    <label className="subtitle">Password</label>
                    <div className="control">
                        <input className="input" type="password" ref={password} />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        {/*submission button*/}
                        <button className="button is-rounded is-link" type="submit" >Submit</button>
                    </div>
                    <div className="control">
                        <Link to="/register" className="button is-rounded is-link is-light">Cancel</Link>
                    </div>
                </div>
                {
                    isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
                }
            </form>
        </section>
    )
}
