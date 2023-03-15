export const getAllArtTypes = () => {
    return fetch("http://localhost:8000/arttypes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}