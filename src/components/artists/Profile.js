import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../../managers/Users"
import "./artist.css"

export const Profile = ({ token }) => {
    const [user, setUser] = useState({
        user: {},
        image_url: "",
        website: "",
        city: {},
        phone_number: 0
    })
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentUser().then((data) => setUser(data[0]))
    }, [])

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
                        <p className="title">name: {user.user.first_name} {user.user.last_name}</p>
                        <p className="title">email: {user.user.email}</p>
                        <p className="title">website: 
                        <Link to={{pathname: `${user.website}`}} target='_blank' className=""> {user.website}</Link></p>

                        <p className="title">phone: {formatPhoneNumber(user.phone_number)}</p>
                        <p className="title">city: {user.city.label}</p>
                        <p className="title">username: {user.user.username}</p>
                        <p className="title">bio: {user.bio}</p>
                    </article>
                </div>
            </div>
            </div>
        </>
    )
}