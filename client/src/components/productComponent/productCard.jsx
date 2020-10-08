import React from 'react';
import {Link} from 'react-router-dom'

export default function ProductCard({product}) {
    return (
    <div className='card shadow'>
        <div>
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt="ImagenProducto"/>
            </Link>
        </div>
        <div>
            <h3>{product.name}</h3>
            <h5>{product.price}</h5>
        </div>
    </div>);
}