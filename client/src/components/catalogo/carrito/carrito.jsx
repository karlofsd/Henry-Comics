import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { UncontrolledCollapse, Button, CardBody, Card, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import './carrito.css';
import axios from 'axios';
import CartProduct from './CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito,getLocalCarrito, cleanCart } from '../../../redux/carrito';

export default function Carrito({user}){
    let history = useHistory()
    // const user = useSelector(store => store.userState.userLogin)
    const carrito = useSelector(store => store.carritoState.carritoProducts);
    const info = useSelector( store => store.carritoState.carritoInfo.id)
    const dispatch = useDispatch();
    console.log(user);

    // const [localCarrito, setLocalCarrito] = useState([]);

    // const carritoGet = () =>{
    //    let data = JSON.parse(localStorage.getItem('carrito'))
    //    console.log(data)
    //    setLocalCarrito(data)
    // }

    const carritoDelete = async (id) =>{
        if(user.id){
            try{
                await axios.delete(`http://localHost:3001/user/${user.id}/cart/${id}`,)
                //carritoGet();
                dispatch(getCarrito(user.id));
            }catch(err){
                console.log(err)
            }
        }else{
            let data = JSON.parse(localStorage.getItem('carrito')).filter(p => p.id !== id)
            localStorage.setItem('carrito',JSON.stringify(data))
            agregarPrecio({id:id},true)
            dispatch(getLocalCarrito())  
        }
    }
    
    const [precioCantidad,setPrecioCantidad] = useState([])

    useEffect(() => {
        console.log(user);
          console.log(carrito)
        if(user.login){
            console.log('back')
             dispatch(getCarrito(user.id))
        }
        else if(localStorage.carrito){
            console.log('local')
             dispatch(getLocalCarrito())
        }

        // return () =>{
        //     dispatch(getCarrito(user.id));
        //     dispatch(getLocalCarrito());
        // }
    }, [])

    useEffect(()=>{
        console.log('segundo useEffect')
        dispatch(getCarrito(user.id))
    },[info])

    console.log(carrito, 'estado despues useEffect')

    const agregarPrecio = (newPrice,del) => {
        let index = precioCantidad.findIndex((p) => p.id === newPrice.id)
        if(del){
            return precioCantidad.splice(index,1)
        }
        if(index !== -1){
            console.log('in')
            console.log('estado',precioCantidad)
            precioCantidad.splice(index,1,newPrice)
        } else {
            setPrecioCantidad([...precioCantidad,newPrice])
        }
        dispatch(getLocalCarrito())
    }

    const totalProduct = () =>{
        let nuevo;
        let total;
        if(carrito[0]){
            if(user.id){
                nuevo =  carrito.map(cart => cart.price * cart.lineaDeOrden.quantity);
            }else{
                nuevo = precioCantidad.map(cart => cart.price)
            }
            total = nuevo.reduce((a, b) => a + b,0);
        }

        
        return (total ? `$${total}` : '$ 0')
    }

    const cantProduct = () =>{
        let nuevo;
        let total;
        if(carrito[0]){
            if(user.login){
                nuevo =  carrito[0] && carrito.map(cart => cart.lineaDeOrden.quantity)
                total = nuevo.reduce((a, b) => a + b, 0);
            }else{
                total = carrito.length
            };
        }
        if(total>0){
            return <Badge color="danger">{total}</Badge>
        }
    }
    const handleBuy = () => {
        if(user.id){
             axios.put(`http://localhost:3001/orders/${info}?status=creada`)
                .then((da)=>{
                    dispatch(cleanCart())
                    window.alert('se compro')
                })

            //await dispatch(getCarrito(user.id))
            //history.push('/admin'
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
                                                quantity={user.id ? cart.lineaDeOrden.quantity:1}
                                                id={cart.id}
                                                price={cart.price}
                                                carritoDelete={carritoDelete}
                                                carritoGet={(id) => dispatch(getCarrito(id))}
                                                user={user.id}
                                                newPrice={agregarPrecio}
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
