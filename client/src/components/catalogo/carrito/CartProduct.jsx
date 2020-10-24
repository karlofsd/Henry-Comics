import React,{useReducer, useState} from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartArrowDown, faSync } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const CartProduct = ({name,quantity,id,price,carritoDelete, carritoGet, stock,user, newPrice}) =>{

    const [cantidad, setCantidad] = useState('');

    const carritoPut = async (body) =>{
        try{
            await axios.put(`http://localHost:3001/user/${user}/cart/`, body, { withCredentials: true })
            carritoGet(user);
          }catch(err){
            console.log(err)
          }
    }

    const stockProduct = () =>{

        if(cantidad > stock){
           if(user){
                carritoPut({id:id, quantity: stock})
           } else{
                newPrice({id:id,price:stock*price})
           }
          
        }else{
            if(user){
                carritoPut({id:id, quantity: cantidad})
            }else{
                newPrice({id:id,price:cantidad*price})
            }
            
            
        }
    }

    const handleInputChange = (e) =>{
        setCantidad(e.target.value)
    }

    return(
        <div>
            
            <li className='item-carrito'>
            <div className='lab-inp-but'>
                <label>{name}</label>
                <input className='inc-dec' name='quantity' type='number'  min='1' step='1' max={stock} value={cantidad}  placeholder={quantity} onChange = {handleInputChange} onClick={()=> stockProduct()} />
                <Button className="btn btn-dark btn-sm m-2 p-1" onClick={()=> carritoDelete(id)} >
                    <FontAwesomeIcon icon={faCartArrowDown}/>  
                </Button>
                {/* <Button className="btn btn-secondary btn-sm m-2 p-1" onClick={()=> stockProduct()} >
                    <FontAwesomeIcon icon={faSync}/>  
                </Button>    */}
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
