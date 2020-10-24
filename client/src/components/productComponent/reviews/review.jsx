import React from 'react';
import { useSelector } from 'react-redux';
import RenderStarRating from './rating/renderStarRating';
import axios from 'axios';
import './review.css';

export default function Review ({getReviews, review, user, userId, productId, deleteReview, handleEdit}) {

  const { comentarios, puntaje, id } = review
  const userReviewId = userId; 

  const modifyReview = async (productId, reviewId) => {
    await axios.put(`http://localhost:3001/reviews/${productId}/review/${reviewId}`, review, {withCredentials: true});
    getReviews();
  };

  const userLogin = useSelector(store => store.userState.userLogin)

   return (
    <div className='review-content'>
      <div className='review-data'>
        <p id='user'>{user}</p>
        <p id='comentario'>{comentarios}</p>
        {/* <div className='buttons'> */}
          {/* {
            userReviewId === userLogin.id &&
            <label type='button' onClick={() => modifyReview(productId, id)}>Editar</label> 
          } */}
          { userLogin.isAdmin ?
            (
              <label className= 'eliminarLabel' type='button' onClick={() => deleteReview(productId, id)}>Eliminar</label>              
              )
              :
              (userReviewId === userLogin.id) &&
              <label className= 'eliminarLabel' type='button' onClick={() => deleteReview(productId, id)}>Eliminar</label> 
            }      
        <RenderStarRating size='small' puntaje={puntaje}/>
        {/* </div>  */}
      </div>
      <hr/>
    </div>  
  ) 
}