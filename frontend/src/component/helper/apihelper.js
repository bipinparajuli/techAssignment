const API = "http://localhost:5000/api"

export const createApp = (id,token,product) => {
    console.log(product);
    return fetch(`${API}/createapp/${id}`,{
      method:"POST",
      headers:{
          Accept:"application/json",
          Authorization : `Bearer ${token}`
  
      },
      body:product    
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
  } 

  
//get all products
export const getProducts = () => {
  console.log("products");

    return fetch(`${API}/getallapp`, {
      method: "GET"
    })
      .then(response => {
     console.log("PRODUCTS",response)
        return response.json();
      })
      .catch(err => console.log(err));
  };

  //get a app

  export const getApp = (id) => {

    return fetch(`${API}/getapp/${id}`, {
      method: "GET"
    })
      .then(response => {
     console.log(response)
        return response.json();
      })
      .catch(err => console.log(err));
  };

    //get a app

    export const searchApp = (title) => {

      return fetch(`${API}/search/${title}`, {
        method: "GET"
      })
        .then(response => {
       console.log(response)
          return response.json();
        })
        .catch(err => console.log(err));
    };
  



  //delete a  product

export const deletProduct = (token,id,userId) => {
    console.log(userId);
    return fetch(`${API}/deleteapp/${userId}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
          console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };


  // getImage

export const Image = (id) => {
  let imgUrl = `${API}/photo/${id}`
  return (
<img src={imgUrl} style={{height:"50px",width:"50px",objectFit:"contain"}} />
  )
}


//update a product

export const updateApp = (token,id,productId,product) => {
  console.log(product)
  return fetch(`${API}/updateapp/${productId}/${id}`,{
      method:"PUT",
      headers:{
          
          Accept:"application/json",
          Authorization : `Bearer ${token}`
      },
      body:product    
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
  } 