import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './reviewsBox.css';
import RenderStarRating from './rating/renderStarRating';
import StarRating from './rating/rating';
import axios from 'axios';


export default function ReviewBox ({productId, nestedModal, toggleNested, closeAll, toggle, toggleAll}) {

  // axios.get('//') con productId
  const [review, setReview] = useState({
                              comentarios: '',
                              puntaje: 0
                            });

  const handleInputChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  }
  console.log(review);
    

  const postReview = async () => {
    try{
      // axios.post url review
      setReview({
        comentarios: '',
        puntaje: 0
      })
    }catch(err) {
      console.log(err);        
    }
  }

  const reviews = [
    {comentarios: 'muy bueno', puntaje: 3},
    {comentarios: 'malo', puntaje: 1},
    {comentarios: 'excelente', puntaje: 5}
  ]

  return (
    <Modal 
      isOpen={nestedModal} 
      toggle={toggleNested} 
      onClosed={closeAll ? toggle : undefined} 
      className='modal-lg review-box'
      contentClassName='review-box-content'
      >
        <ModalHeader>
          <div className='reviews'>
            <div>Opiniones sobre el producto</div>
            <div>
              <div className='rating-box'>
                <h1> 4.0 </h1>
                <RenderStarRating/>
              </div>
              <div className='allReviews'>
                
                {/*mapear reviews 
                necesito la review, comentarios y puntaje, el id del producto, el usuario
                */}
              </div>
            </div>
          </div>          
        </ModalHeader>
        <ModalBody contentClassName='form-review'>
          <textarea className="border input-review" name='comentarios' onChange={handleInputChange}/>
          <StarRating handleInputChange={handleInputChange}/>          
        <ModalFooter>
            <Button color="primary" onClick={toggleNested}>enviar</Button>{' '}
            <Button color="secondary" onClick={toggleAll}>cancelar</Button>
        </ModalFooter>
        </ModalBody>
    </Modal>
  ) 
} 