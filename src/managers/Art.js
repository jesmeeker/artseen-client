export const getAllArt = () => {
    return fetch(`http://localhost:8000/art`, 
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      }
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
  
  
  export const getArtByArtistId = (id) => {
      return fetch(`http://localhost:8000/art?artist=${id}`,
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
    }).then(res => res.json())
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
  
  export const updatePiece = (id, postbody) => { 
    return fetch(`http://localhost:8000/art/${id}`, {
        method: "PUT",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        },
        body: JSON.stringify(postbody),
    })
  }

  export const deletePiece = (id) => {
    return fetch(`http://localhost:8000/art/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
  }

  export const getSearchedArt = (searchTerm) => {
    return fetch(`http://localhost:8000/art?search=${searchTerm}`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
      })
      .then(res => res.json())
    
  }
  
  export const addLike = (id) => {
    return fetch(`http://localhost:8000/art/${id}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
}

export const deleteLike = (id) => {
    return fetch(`http://localhost:8000/art/${id}/unlike`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
    })
}
  export const addFavorite = (id) => {
    return fetch(`http://localhost:8000/art/${id}/favorite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
}

export const deleteFavorite = (id) => {
    return fetch(`http://localhost:8000/art/${id}/unfavorite`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
    })
}