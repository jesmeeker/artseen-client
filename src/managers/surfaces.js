export const getAllSurfaces = () => {
    return fetch("http://localhost:8000/surfaces", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}