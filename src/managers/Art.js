export const getAllArt = () => {
    return fetch("http://localhost:8000/art", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}