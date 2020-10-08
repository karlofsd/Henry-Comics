import React from 'react';

export default function ProductCard(props) {
    return (
    <div>
        <div>
        <img src={props.image} alt="ImagenProducto"/>
        </div>
        <div>
            <h3>Nombre Producto</h3>
            <h5>$1500</h5>
            </div>
    </div>);
}