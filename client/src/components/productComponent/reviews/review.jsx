import React from 'react';
import { useSelector } from 'react-redux';
import RenderStarRating from './rating/renderStarRating';
import './review.css';

export default function Review ({review, user, userId, productId, deleteReview, handleEdit}) {

  const { comentarios, puntaje, id } = review
  const userReviewId = userId; 

  const userLogin = useSelector(store => store.userState.userLogin)

   return (
    <div className='review-content'>
      <div className='review-data'>
        <p id='user'>{user}</p>
        <p id='comentario'>{comentarios}</p>
        <RenderStarRating size='small' puntaje={puntaje}/>
        {
          userReviewId === userLogin.id ?
          <div className='buttons'>
            <button onClick={() => handleEdit(review)}>Editar</button>
            <button onClick={() => deleteReview(productId, id)}>X</button>           
          </div> :
          <p></p>      
        }
      </div>
      <hr/>
    </div>  
  )
}
