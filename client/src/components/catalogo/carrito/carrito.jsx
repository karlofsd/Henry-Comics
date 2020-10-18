import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { UncontrolledCollapse, Button, CardBody, Card, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import './carrito.css';
import axios from 'axios';
import CartProduct from './CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito,getLocalCarrito } from '../../../redux/carrito';

export default function Carrito(){
    let history = useHistory()
    const user = useSelector(store => store.userState.user)
    const carrito = useSelector(store => store.carritoState.carritoProducts);
    const info = useSelector( store => store.carritoState.carritoInfo)
    const dispatch = useDispatch();


    // const [localCarrito, setLocalCarrito] = useState([]);

    // const carritoGet = () =>{
    //    let data = JSON.parse(localStorage.getItem('carrito'))
    //    console.log(data)
    //    setLocalCarrito(data)
    // }

    const carritoDelete = async (id) =>{
        if(info.id > 0){
            try{
                await axios.delete(`http://localHost:3001/user/${info.id}/cart/${id}`,)
                //carritoGet();
                dispatch(getCarrito());
            }catch(err){
                console.log(err)
            }
        }else{
            let data = JSON.parse(localStorage.getItem('carrito')).filter(p => p.id !== id)
            localStorage.setItem('carrito',JSON.stringify(data))
            dispatch(getLocalCarrito())  
        }
    }

    useEffect(() => {
        if(user){
            console.log('back')
            return dispatch(getCarrito())
        }
        if(localStorage.carrito){
            console.log('local')
            return dispatch(getLocalCarrito())
        }
    }, [])

   

    const totalProduct = () =>{
        let nuevo;
        let total;
        if(carrito[0]){
            if(info.id > 0){
                nuevo =  carrito.map(cart => cart.price * cart.lineaDeOrden.quantity);
            }else{
                nuevo = carrito.map(cart => cart.price)
            }
            total = nuevo.reduce((a, b) => a + b,0);
        }

        
        return (total ? `$${total}` : '$ 0')
    }

    const cantProduct = () =>{
        let nuevo;
        let total;
        if(carrito[0]){
            if(info.id > 0){
                nuevo =  carrito.map(cart => cart.lineaDeOrden.quantity)
                total = nuevo.reduce((a, b) => a + b, 0);
            }else{
                total = carrito.length
            };
        }
        if(total>0){
            return <Badge color="danger">{total}</Badge>
        }
    }
    const handleBuy = async() => {
        if(info.id){
            await axios.put(`http://localhost:3001/orders/${info.id}?status=creada`)
        }else{
            alert('Debe logearse, para seguir con su compra.')
            history.push('/signup')
        }
    }

    return(
        <div className='cart'>
            
            <Button color='dark' id='toggler' style={{marginBottom: '1rem'}}>
                <FontAwesomeIcon icon={faShoppingCart}/>  {cantProduct()}
            </Button>
            <UncontrolledCollapse toggler='#toggler'>
                <Card>
                    <CardBody>
                        <h3 className='title-carrito'>Carrito</h3>
                        <hr />
                        <div className='body1'>
                            <ul className='list-carrito'>
                                {carrito && carrito.map(cart=>(
                                    <div>
                                            <CartProduct 
                                                name={cart.name}
                                                stock={cart.stock}
                                                quantity={user ? cart.lineaDeOrden.quantity:1}
                                                id={cart.id}
                                                price={cart.price}
                                                carritoDelete={carritoDelete}
                                                carritoGet={() => dispatch(getCarrito())}
                                            />
                                    </div>  
                                ))}
                            </ul>
                        </div>
                        <div className='total'>
                                <label>Total: {totalProduct()}</label>
                        </div>
                        <div className='buttons'>
                            <Button className="btn btn-secondary btn-sm m-2 p-1" onClick={handleBuy}>Comprar</Button>
                        </div>
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    );
};
