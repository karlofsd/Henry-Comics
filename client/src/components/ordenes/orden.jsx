import React from 'react'
import {Table} from 'reactstrap'
import './orden.css'

const Orden = () => {
    return(
        <div className="shadow orden">
            <div className="top">
                <h2>ORDEN #3</h2>
                {/* <table>
                    <thead>
                        <td>Nombre</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Total</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Batman</td>
                            <td>$150</td>
                            <td>3</td>
                            <td>$450</td>
                        </tr>
                    </tbody>
                </table> */}
                <Table size="sm" bordered>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Batman</th>
                        <td>$150</td>
                        <td>3</td>
                        <td>$450</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='datos'>
                    <span>Estado: Creada</span>
                    <span>Fecha: 17/11/20</span>
                </div>
            </div>
            <div className="bottom">
                <h4>Usuario: user@mail.com</h4>
                <div className="left">
                    <div className="details">
                    <p className='priceproductcard' >$500</p>
                    </div>
                    <button className="btn btn-light pill-rounded" >Procesar</button>
                </div>
            </div>
        </div>
    )
}

export default Orden;