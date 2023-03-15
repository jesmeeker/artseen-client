export const getAllSubTypes = () => {
    return fetch("http://localhost:8000/subtypes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}

export const getSubTypesByArtypeId = (id) => {
  return fetch(`http://localhost:8000/subtypes?arttypeId=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("artseen_token")}`
    },
  })
      .then(res => res.json())
}

export const createPieceSubRelationship = (postbody) => { 
  return fetch(`http://localhost:8000/artsubrelationship`, {
      method: "POST",
      headers: { 
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
      body: JSON.stringify(postbody),
  })
}