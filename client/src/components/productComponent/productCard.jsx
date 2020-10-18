import React, { Fragment, useState } from 'react';
import './productCard.css'
import Product from './product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {  useDispatch } from 'react-redux';
import { getCarrito } from '../../redux/carrito';

import axios from 'axios';


export default function ProductCard({product, capitalize}) {
    let user;
    const dispatch = useDispatch()

    const addCart = async(body)=>{
        await axios.post(`http://localhost:3001/user/${1}/cart`, body)
        .then(res=>{
            dispatch(getCarrito())
        })
        .catch(err=>{
            console.log('err', err)
        })
    }

    /* const [detail,setDetail] = useState(false) */
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
        <div className='shadow wrapper'>
            <div className="container">
                <div className="top">
                    <img src={product.image} className='img' alt="reloj" />
                </div>
                <div className="bottom">
                    <h4>{product.name = product.name.substring(0, 1).toUpperCase() + product.name.substring(1)}</h4>
                    <div className="left">
                        <div className="details">
                        <p className='priceproductcard' >${product.price}</p>
                        </div>
                        <button onClick={toggle} className="btn btn-light pill-rounded" >Ver más</button>
                        <div>
                            <button onClick={()=> addCart(product)} className="btn btn-light pill-rounded" >
                                <FontAwesomeIcon icon={faCartPlus}/>
                                {console.log(product)}                              
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Product modal={modal} toggle={toggle} p={product} capitalize={capitalize} addCart={addCart}/>
        </Fragment>
    );
}