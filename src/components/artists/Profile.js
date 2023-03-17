import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../../managers/Users"
import "./artist.css"



export const Profile = ({ token }) => {
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentUser().then((data) => setUser(data))
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

    const current_user = user[0]

    return (
        <>  
            <div className="art__container">
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <article class="tile is-child is-20">
                        <img className="_image" src={current_user.image_url} alt={current_user.image_url} />
                    </article>
                </div>
                <div class="tile is-parent is-8">
                    <article class="tile is-child">
                        <p className="title">name: {current_user.user.first_name} {current_user.user.last_name}</p>
                        <p className="title">email: {current_user.user.email}</p>
                        <p className="title">website: 
                        <Link to={{pathname: `${current_user.website}`}} target
            ='_blank' className=""> {current_user.website}</Link></p>

                        <p className="title">phone: {formatPhoneNumber(current_user.phone_number)}</p>
                        <p className="title">city: {current_user.city.label}</p>
                        <p className="title">username: {current_user.user.username}</p>
                        <p className="title">bio: {current_user.bio}</p>
                    </article>
                </div>
            </div>
            </div>
        </>
    )
}