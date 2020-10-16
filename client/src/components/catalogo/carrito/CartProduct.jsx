import React,{useState} from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartArrowDown, faSync } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const CartProduct = ({name,quantity,id,price,carritoDelete, carritoGet}) =>{

    const [cantidad, setCantidad] = useState(0)

    const CarritoPut = async (body) =>{
        try{
            await axios.put(`http://localHost:3001/user/${1}/cart/`, body)
            carritoGet();
          }catch(err){
  
          }
    }

    return(
        <div>
            <li className='item-carrito'>
            <div className='lab-inp-but'>
                <label>{name}</label>
                <input className='inc-dec' name='quantity' type='number'  min='0' step='1'  defaultValue={quantity} onChange = {e=>setCantidad(e.target.value)} />
                <Button color='danger' onClick={()=> carritoDelete(id)} >
                    <FontAwesomeIcon icon={faCartArrowDown}/>  
                </Button>
                <Button color='warning' onClick={()=> CarritoPut({id:id, quantity: cantidad})} >
                    <FontAwesomeIcon icon={faSync}/>  
                </Button>   
            </div>
            </li>
            <li className='item-carrito'>
                <span>{price}</span>
            </li>
        </div>
    )

}

export default CartProduct
