import React from 'react';
import RenderStarRating from './rating/renderStarRating';
import './review.css';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function Review ({comentario, puntaje, user, userId, getReviews, productId, id}) {

  const userLogin = useSelector(store => store.userState.userLogin)

  const deleteReview = async (productId, reviewId) => {
    await axios.delete(`http://localhost:3001/reviews/${reviewId}/product/${productId}`, {withCredentials: true});
    getReviews();
  };

  return (
    <div className='review-content'>
      <p id='user'>{user}</p>
      <p id='comentario'><i>"{comentario}"</i></p>
      <div className='edit'>
      <RenderStarRating size='small' puntaje={puntaje}/>
      <div className='buttons'>
          {/* {
            userId === userLogin.id &&
              <button onClick={() => modifyReview(productId, id)}>Editar</button> 
          } */}
          { userLogin.isAdmin ?
            (
            <button className='btn eliminar' onClick={() => deleteReview(productId, id)}>Eliminar</button>              
            )
            :
            (userId === userLogin.id) &&
            <a className='btn eliminar' onClick={() => deleteReview(productId, id)}>Eliminar</a> 
          }      
        </div> 
      </div>
      <hr/>
    </div>  
  )
}
