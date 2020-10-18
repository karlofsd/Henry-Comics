import React from 'react';
import { Table } from 'reactstrap';
import './orden.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Orden = ({order, getOrders}) => {

    // const [order, setOrder] = useState();
    const [total, setTotal] = useState(0);
    const [status, setStatus ] = useState();
    const [action, setAction] = useState();

    // useEffect(() => {
    //     getOrder()
    // },[order]);

    // useEffect(() => {
    //     setStatus(order.status);    
           
    //     switch(status){
    //         case 'creada':
    //             setAction('?status=procesando');                
    //         case 'procesando':
    //             setAction('?status=completa');                
    //         case 'cancelar':
    //             setAction('?status=cancelada');          
    //     }
    // },[order])

    useEffect(() => {     
        let total = 0;   

        order && order.products.forEach((p) => {
          total = total + (p.price * p.lineaDeOrden.quantity);            
        })
        setTotal(total)   
        
    },[order])    

    // const getOrder = async (id) => {
    //     const data = await axios.get(`http://localhost:3001/orders/${orderId}`);
    //     console.log(data.data);          
    //     setOrder(data.data);
    // }
    
    const handleStatusChange = (id) => {

        axios.put(`http://localhost:3001/orders/${id}${action}`)
        getOrders()
    }
          
    return(
        <div className="shadow orden">
            <div className="top">
                <h2>ORDEN #{order.id}</h2>                
                <Table size="sm" bordered>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th className='tO w-20'>Precio</th>
                        <th className='tO w-15'>Cantidad</th>
                        <th className='tO w-20'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order && order.products.map((p) => (                       
                            <tr>
                            <th scope="row">{p.name}</th>
                            <td className='tO'>${p.price}</td>
                            <td className='tO'>{p.lineaDeOrden.quantity}</td>
                            <td className='tO'>${p.price * p.lineaDeOrden.quantity}</td>
                            </tr>                     
                        )
                        )}
                    </tbody>
                </Table>
                <div className='datos'>
                    <span>Estado: {order.status.toUpperCase()}</span>
                    <span>Fecha: {order.createdAt.split('T')[0].replace(/-/gi,'/').replace(/(\w+)\/(\w+)\/(\w+)/,"$3/$2/$1")}</span>
                </div>
            </div>
            <div className="bottom">
                <h4>Usuario: {order.user.email}</h4>
                <div className="left">
                    <div className="details">
                    <p className='priceproductcard' >${total}</p>
                    </div>
                    {   status === 'creada' ?
                    <button className="btn btn-light pill-rounded" onClick={() => handleStatusChange(order.id)} >Procesar</button> 
                    :
                        status === 'procesando' ?
                    <button className="btn btn-light pill-rounded" onClick={handleStatusChange}>Completar</button>
                    : 
                        status === 'completa' ?
                    <h3><span className="badge badge-success" >Completa</span> </h3>
                    :
                    <h3><span className="badge badge-danger">Cancelada</span></h3>
                    }
                    <button className="btn btn-danger pill-rounded " >Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default Orden;