import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import RenderStarRating from './rating/renderStarRating';
import StarRating from './rating/rating';
import Review from './review';
import './reviewsBox.css';

export default function ReviewBox ({productId, nestedModal, toggleNested, closeAll, toggle, toggleAll}) {

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
                              comentarios: '',
                              puntaje: 0
                            });
  const [rating, setRating] = useState(0);

  const user = useSelector(store => store.userState.userLogin);
  console.log(review);
    
  let history = useHistory();
          
  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    setRating(getProductRating())
  }, [reviews]);

  const handleInputChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  };   

  const handleEdit = (review) => {
    setReview(review);
  };

  const postReview = async () => {
    try{
      if(user.id){
        await axios.post(`http://localhost:3001/reviews/${productId}/user/${user.id}`, review, { withCredentials: true })
        setReview({
          comentarios: '',
          puntaje: 0
        });
        getReviews();
      } else {
        alert('Para comentar debe loguearse');
        history.push('/login');
      }
    }catch(err) {
      console.log(err);        
    }
  };

  const getReviews = async () => {
    try{
      const {data} = await axios.get(`http://localhost:3001/products/${productId}/review`, { withCredentials: true }) 
      setReviews(data);  
    }catch(err) {
      console.log(err);    
    }
  };
  
  const getProductRating = () => {
    let sum = reviews.reduce(function(acc, rev) {
      return {puntaje: acc.puntaje + rev.puntaje }
    },{puntaje: 0})

    return (sum.puntaje/reviews.length || 0);
  };

  // const modifyReview = async (productId, reviewId) => {
  //   await axios.put(`http://localhost:3001/reviews/${productId}/review/${reviewId}`, review, {withCredentials: true});
  //   getReviews();
  // }; poner las funciones en el componente review, ver toda la logica de editar ahi

  const deleteReview = async (productId, reviewId) => {
    await axios.delete(`http://localhost:3001/reviews/${reviewId}/product/${productId}`);
    getReviews();
  };

  const onSubmit = () => {
    postReview();    
  };

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
            <div className='rating-box'>
              <h1> {rating.toFixed(1)} </h1>
              <RenderStarRating puntaje={rating} size='medium'/>
            </div>         
        </div>          
      </ModalHeader>
      <ModalBody contentClassName='form-review'>
        <div className='allReviews'>
          {reviews[0] && reviews.map((r, i) => (
            <Review
              review={r}    
              user={r.user.email}
              userId={r.user.id}                
              productId={productId}
              get={getReviews}
              deleteReview={deleteReview}            
              key= {i}                
                />          
          ))
          }                
        </div>
        <textarea 
          className="border input-review" 
          name='comentarios' 
          placeholder='Ingrese Comentario' 
          onChange={handleInputChange}
          value={review.comentarios}
          />
        <label>Click to Rate</label>
        <StarRating handleInputChange={handleInputChange}/>          
      <ModalFooter>  

        <Button color="primary" onClick={onSubmit}>Enviar</Button>
        { review.id &&
          <Button color="primary" >Editar</Button>
        }
        <Button color="secondary" onClick={toggleNested}>Cerrar</Button>
      </ModalFooter>
      </ModalBody>
    </Modal>
  ) 
}