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

  export const getSinglePiece = (id) => {
    return fetch(`http://localhost:8000/art/${id}`, 
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      }
    }).then((res) => res.json())
  }

  export const addNewPiece = (postbody) => { 
    return fetch(`http://localhost:8000/art`, {
        method: "POST",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        },
        body: JSON.stringify(postbody),
    })
  }