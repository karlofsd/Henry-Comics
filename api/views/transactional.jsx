const {View} = require('grandjs')
const Tabla = ({productos}) => {
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
                {productos.map(p => 
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