export const getGalleries = () => {
    return fetch("http://localhost:8000/galleries", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}

export const getGalleriesByCityId = (id) => {
    return fetch(`http://localhost:8000/galleries?city=${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}