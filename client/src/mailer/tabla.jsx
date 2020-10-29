import React from 'react'
import {useSelector} from 'react-redux'

const Tabla = () => {
    const products = useSelector(store => store.carritoState.carritoProducts)
    return (

        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Precio Total</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => 
                <tr>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.lineaDeOrden.quantity}</td>
                    <td>{p.price*p.lineaDeOrden.quantity}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

module.exports = Tabla

