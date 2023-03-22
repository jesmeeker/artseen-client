export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/artist?user`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("artseen_token")}`
            }
        })
        .then(res => res.json())
}

export const updateArtist = (id, body) => {
    return fetch(`http://localhost:8000/artist/${id}`, {
        method: "PUT",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        },
        body: JSON.stringify(body),
    })
};

export const getAllArtists = () => {
    return fetch(`http://localhost:8000/artist`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("artseen_token")}`
            }
        })
        .then(res => res.json())
}
export const getSingleArtist = (id) => {
    return fetch(`http://localhost:8000/artist/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("artseen_token")}`
            }
        })
        .then(res => res.json())
}

export const addFollow = (id) => {
    return fetch(`http://localhost:8000/artist/${id}/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
}

export const deleteFollow = (id) => {
    return fetch(`http://localhost:8000/artist/${id}/unfollow`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
    })
}