import React,{useState} from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartArrowDown, faSync } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const CartProduct = ({name,quantity,id,price,carritoDelete, carritoGet, stock}) =>{

    const [cantidad, setCantidad] = useState('');
    

    const carritoPut = async (body) =>{
        try{
            await axios.put(`http://localHost:3001/user/${1}/cart/`, body)
            carritoGet();
          }catch(err){
  
          }
    }

    const stockProduct = () =>{

        if(cantidad > stock){
            

            carritoPut({id:id, quantity: stock})
        }else{
            carritoPut({id:id, quantity: cantidad})

        }
        setCantidad('')
    }

    const handleInputChange = (e) =>{
        setCantidad(e.target.value)
    }

    return(
        <div>
            
            <li className='item-carrito'>
            <div className='lab-inp-but'>
                <label>{name}</label>
                <input className='inc-dec' name='quantity' type='number'  min='1' step='1' max={stock} value={cantidad}  placeholder={quantity} onChange = {handleInputChange} />
                <Button className="btn btn-dark btn-sm m-2 p-1" onClick={()=> carritoDelete(id)} >
                    <FontAwesomeIcon icon={faCartArrowDown}/>  
                </Button>
                <Button className="btn btn-secondary btn-sm m-2 p-1" onClick={()=> stockProduct()} >
                    <FontAwesomeIcon icon={faSync}/>  
                </Button>   
            </div>
            </li>
            <li className='item-carrito'>
                <span>${price}</span>
            </li>
            <hr/>
        </div>
    )

}

export default CartProduct
