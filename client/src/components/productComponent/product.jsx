import React from 'react';

export default function Product(props) {
    return (
    <div>
        <div>
        <img src="https://i.gifer.com/WiCJ.gif" alt="Producto"/>
        </div>
        <div>
            <h3>Ironman #085</h3>
            <h5>$1800</h5>
            </div>
            <div>
            <p>Revista número 085 de la saga de Ironman, edición coleccionable</p>
            <h5>Stock disponible: 6</h5>
        </div>
        <div>
            <button>Agregar al carrito</button>
        </div>
    </div>
    );
}