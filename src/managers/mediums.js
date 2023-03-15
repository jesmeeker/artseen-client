export const getAllMediums = () => {
    return fetch("http://localhost:8000/mediums", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}