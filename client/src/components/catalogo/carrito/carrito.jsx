import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import './carrito.css';



export default function Carrito(){
    return(
        <div className='cart'>
            <Button color='dark' id='toggler' style={{marginBottom: '1rem'}}>
                <FontAwesomeIcon icon={faShoppingCart}/>
            </Button>
            <UncontrolledCollapse toggler='#toggler'>
                <Card>
                    <CardBody>
                        <h3 className='title-carrito'>Carrito</h3>
                        <div>
                            <ul className='list-carrito'>
                                <label>Producto: </label>
                                <li className='item-carrito'>
                                    <div className='lab-inp-but'>
                                        <label>Thunders</label>
                                        <input className='inc-dec' type='number' min='1' step='1'/>
                                        <Button color='warning'>
                                            <FontAwesomeIcon icon={faCartArrowDown}/>  
                                        </Button>
                                    </div>
                                </li>
                                <li className='item-carrito'>
                                <div className='lab-inp-but'>
                                        <label>Avengers</label>
                                        <input className='inc-dec' type='number' min='1' step='1'/>
                                        <Button color='warning'>
                                            <FontAwesomeIcon icon={faCartArrowDown}/>  
                                        </Button>   
                                    </div>
                                </li>
                                <li className='item-carrito'>
                                <div className='lab-inp-but'>
                                        <label>Condorito</label>
                                        <input className='inc-dec' type='number' min='1' step='1'/>
                                        <Button color='warning'>
                                            <FontAwesomeIcon icon={faCartArrowDown}/>  
                                        </Button>
                                    </div>
                                </li>
                            </ul>
                            <ul className='list-carrito'>
                                <label>Envio: </label>
                                <li className='item-carrito'>
                                    <label>En Puerta</label>                                    
                                    <Input addon type='checkbox' arial-label='Check'/>
                                </li>
                                <li className='item-carrito'>
                                    <label>A Sucursal</label>
                                    <Input addon type='checkbox' arial-label='Check'/>
                                </li>
                            </ul>
                        </div>
                        <div className='total'>
                            <label>Producto + Envio</label>
                            <label>Total: $500</label>
                        </div>
                        <div className='buttons'>
                            <Button color='dark'>Comprar</Button>
                            <Button color='danger'>Cancelar</Button>
                        </div>
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    );
};
