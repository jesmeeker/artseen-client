export const getAllArt = () => {
    return fetch("http://localhost:8000/art", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}

export const getCurrentUserPieces = () => {
    return fetch(`http://localhost:8000/art?user`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
      })
      .then(res => res.json())
  };