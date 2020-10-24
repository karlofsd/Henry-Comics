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
        <RenderStarRating size='small' puntaje={puntaje}/>
        <div className='buttons'>
          {
            userReviewId === userLogin.id &&
              <button onClick={() => modifyReview(productId, id)}>Editar</button> 
          }
          { userLogin.isAdmin ?
            (
            <button onClick={() => deleteReview(productId, id)}>X</button>              
            )
            :
            (userReviewId === userLogin.id) &&
            <button onClick={() => deleteReview(productId, id)}>X</button> 
          }      
        </div> 
      </div>
      <hr/>
    </div>  
  ) 
}