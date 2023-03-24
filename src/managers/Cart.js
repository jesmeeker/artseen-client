export const getAllCartItems = () => {
    return fetch("http://localhost:8000/cart", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}
export const deleteFromCart = (id) => {
    return fetch (`http://localhost:8000/cart/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        }
    })
}

export const getUserPayments = () => {
    return fetch("http://localhost:8000/paymenttypes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}
export const getPaymentById = (id) => {
    return fetch(`http://localhost:8000/paymenttypes/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
      },
    })
        .then(res => res.json())
}

export const createNewPayment = (postbody) => { 
    return fetch(`http://localhost:8000/paymenttypes`, {
        method: "POST",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        },
        body: JSON.stringify(postbody),
    })
  }

  export const updateCart = (id, postbody) => { 
    return fetch(`http://localhost:8000/orders/${id}`, {
        method: "PUT",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("artseen_token")}`
        },
        body: JSON.stringify({payment_type: parseInt(postbody)}),
    })
  }
