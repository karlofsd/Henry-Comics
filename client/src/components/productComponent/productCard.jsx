import React, { Fragment, useState } from 'react';
import './productCard.css'
import Product from './product'

export default function ProductCard({product, capitalize}) {
    
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
                    </div>
                </div>
            </div>
        </div>
        <Product modal={modal} toggle={toggle} p={product} capitalize={capitalize} />
        </Fragment>
    );
}