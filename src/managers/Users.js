export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/artist?user`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("artseen_token")}`
            }
        })
        .then(res => res.json())
};