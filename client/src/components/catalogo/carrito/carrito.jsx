import React, {useState, useEffect} from 'react';
import { UncontrolledCollapse, Button, CardBody, Card, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import './carrito.css';
import axios from 'axios';
import CartProduct from './CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito } from '../../../redux/carrito';

export default function Carrito(){

    const carrito = useSelector(store => store.carritoState.carritoProducts);
    const dispatch = useDispatch();


    //const [carrito, setCarrito] = useState([]);

    // const carritoGet = async () =>{
    //     try{
    //       const {data} =  await axios.get(`http://localHost:3001/user/${1}/cart`)
    //       setCarrito(data.products)
    //     }catch(err){

    //     }
    // }

    const carritoDelete = async (id) =>{
        try{
            await axios.delete(`http://localHost:3001/user/${1}/cart/${id}`,)
            //carritoGet();
            dispatch(getCarrito());
          }catch(err){
  
          }
    }

    useEffect(() => {
        //carritoGet();
        dispatch(getCarrito());
        console.log('!!!!!!!',carrito);
    }, [])

   

    const totalProduct = () =>{
        let nuevo;
        if(carrito !== []){
            nuevo =  carrito.map(cart => cart.price * cart.lineaDeOrden.quantity);
        }

        let total = nuevo.reduce((a, b) => a + b, 0);
        
        return `$${total}`
    }

    const cantProduct = () =>{
        let nuevo;
        if(carrito !== []){
            nuevo =  carrito.map(cart => cart.lineaDeOrden.quantity);
        }
        let total = nuevo.reduce((a, b) => a + b, 0);
        if(total>0){
            return <Badge color="danger">{total}</Badge>
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
                                                quantity={cart.lineaDeOrden.quantity}
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
                            <Button className="btn btn-secondary btn-sm m-2 p-1">Comprar</Button>
                        </div>
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    );
};
