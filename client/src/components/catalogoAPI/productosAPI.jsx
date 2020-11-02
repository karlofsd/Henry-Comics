import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ProductAPI (props) {

  const user = useSelector(store => store.userState.userLogin);

  const addWishlist = async() => {
    if(user.id){
      let body = {
        name: props.product.name, 
        description: props.product.description,
        image: props.product.image.screen_large_url
      }
      await axios.post(`http://localhost:3001/wishlist/add/${user.id}`, body, {withCredentials: true})
        .then((res) => {
          alert('Se agregó!')
        })
        .catch((err) => {
          console.log(err);          
        })
    }else {
      alert('Debe loguearse')
    }

  }

  return (
    <div className="wrapper-index">
        <div className='cont-img'>
          <img src={props.product.image.screen_large_url} className="img-index"/>
        </div>
        <div className="description-index">
            <h3>{props.product.name}</h3>     
            <p>{props.product.description}</p>
            <button onClick={addWishlist}>Agregar</button>
        </div>
    </div>
  );
};