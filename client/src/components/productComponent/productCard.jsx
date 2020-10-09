import React from 'react';
import {Link} from 'react-router-dom'
import './productCard.css'
export default function ProductCard({product}) {
    
    
    return (
        <div className='shadow wrapper'>
            <div className="container">
                <div className="top">
                    <img src={product.image} className='reloj-img' alt="reloj" />
                </div>
                <div className="bottom">
                <div className="left">
                    <div className="details">
                    <h4>{product.name = product.name.substring(0, 1).toUpperCase() + product.name.substring(1)}</h4>
                    <p className='priceproductcard' >${product.price}</p>
                    </div>
                    <button /* onClick={() => handleClick()} */ className="buy" ><i className="fas fa-shopping-cart"></i></button>
                </div>
                </div>
            </div>
            <div className="container-hover">
                <div className="top">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
                <div className="bottom">
                <button /* onClick={() => handleClick()} */ className="buy" ><i className="fas fa-shopping-cart"></i></button>
                </div>
            </div>
        </div>
    );
}