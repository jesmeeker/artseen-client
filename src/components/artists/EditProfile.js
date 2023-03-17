import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../../managers/Users"
import "./artist.css"



export const EditProfile = ({ token }) => {
    const [user, setUser] = useState({
        user: {},
        image_url: "",
        website: "",
        city: {},
        phone_number: 0
    })
    const [tempUser, setTempUser] = useState({
        user: {},
        image_url: "",
        website: "",
        city: {},
        phone_number: 0
    })
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentUser().then((data) => {
            setUser(data[0])
            setTempUser(data[0])
        })
    }, [])

    const updateArtist= (e) => {
        e.preventDefault();
        updateArtist(user.id, tempUser)
        .then((response) => {
                if (!response.ok) throw new Error('something went wrong');
                return response.json();
            })
            .then((data) => {
                setUser(data.customer);
                setChanged(false);
            })
    }

    const formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    return (
        <>
            <div className="art__container">
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child is-20">
                            <img className="_image" src={user.image_url} alt={user.image_url} />
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
                            {/* <div className="">
                                <label for="name">Name</label>
                            </div> */}

                            <fieldset>
                                <div className="title">name:
                                <input
                                    className="title"
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
                                        copy.user.email = (e.target.value)
                                        setChanged(true);
                                        setTempUser(copy);
                                    }}
                                    />
                                    </p>
                                    <p className="title">phone: <input
                                    className="title"
                                    id="website"
                                    type="text"
                                    value={formatPhoneNumber(user.phone_number)}
                                    onChange={(e) => {
                                        const copy = { ...tempUser }
                                        copy.user.email = (e.target.value)
                                        setChanged(true);
                                        setTempUser(copy);
                                    }}
                                    />
                                    </p>
                                    <p className="title">city: <input
                                    className="title"
                                    id="website"
                                    type="text"
                                    value={user.city.label}
                                    onChange={(e) => {
                                        const copy = { ...tempUser }
                                        copy.user.city = (e.target.value)
                                        setChanged(true);
                                        setTempUser(copy);
                                    }}
                                    />
                                    </p>
                                    <p className="title">username: <input
                                    className="title"
                                    id="username"
                                    type="text"
                                    value={user.user.username}
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
                                        value={user.bio}
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
                            {/* <p className="title">name: {current_user.user.first_name} {current_user.user.last_name}</p>
                            <p className="title">email: {current_user.user.email}</p>
                            <p className="title">website:
                                <Link to={{ pathname: `${current_user.website}` }} target
                                    ='_blank' className=""> {current_user.website}</Link></p>

                            <p className="title">phone: {formatPhoneNumber(current_user.phone_number)}</p>
                            <p className="title">city: {current_user.city.label}</p>
                            <p className="title">username: {current_user.user.username}</p>
                            <p className="title">bio: {current_user.bio}</p> */}
                        </article>
                    </div>
                </div>
           
       
         <div>
                    
                    {changed ? (
                        <div className="mb-2">
                            <button
                                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
                                onClick={(e) => {
                                    setTempUser({ ...user });
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                form="customer"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    ) : null}
                    </div>
                </div>
            <br />
            {/* <Link to="/customers">
                <button className="">
                    ← Go back
                </button>
            </Link> */}

        </>
    );
}
