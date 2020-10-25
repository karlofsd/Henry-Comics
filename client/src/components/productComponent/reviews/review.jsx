import React from 'react';
import RenderStarRating from './rating/renderStarRating';
import './review.css';

export default function Review ({comentario, puntaje, user}) {

  return (
    <div className='review-content'>
      <p id='user'>{user}</p>
      <p id='comentario'><i>"{comentario}"</i></p>
      <RenderStarRating size='small' puntaje={puntaje}/>
      <hr/>
    </div>  
  )
}