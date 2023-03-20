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