export const getCities = () => {
    return fetch("http://localhost:8000/cities", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}