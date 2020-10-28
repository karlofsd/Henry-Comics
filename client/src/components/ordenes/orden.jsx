import React from 'react';
import { Table } from 'reactstrap';
import './orden.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Orden = ({order, setStatusG, statusG, getOrder,user}) => {    
    
    const [total, setTotal ] = useState(0);
    const [status, setStatus ] = useState();    
      
    useEffect(() => { 
        let total = 0;   

        order.products && order.products.forEach((p) => {
          total = total + (p.price * p.lineaDeOrden.quantity);            
        })
        setTotal(total)   
        setStatus(order.status);    
    },[order])    
    
    const handleProcess = async (order) => {
        try{
            await axios.put(`http://localhost:3001/orders/${order.id}?status=procesando`, null, { withCredentials: true })            
            setStatusG(!statusG);  
            getOrder(order.id);
        } catch(err) {
            console.log(err);
        }       
    }

    const handleComplete = async (order) => {
        try{
            await axios.put(`http://localhost:3001/orders/${order.id}?status=completa`, null, { withCredentials: true })            
            setStatusG(!statusG);
            getOrder(order.id);
        } catch(err) {
            console.log(err);              
        } 
    }

    const handleCancel = async (order) => {
        try{
            await axios.put(`http://localhost:3001/orders/${order.id}?status=cancelada`, null, { withCredentials: true })            
            setStatusG(!statusG);
            getOrder(order.id);
        } catch(err) {
            console.log(err);              
        } 
    }

    const handleRemove = async(product,orden) => {
        await axios.delete(`http://localhost:3001/user/order/${orden}/product/${product}`, { withCredentials: true })
        setStatusG(!statusG);
        getOrder(order.id);
    }

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
                            {(user && order.status !== 'cancelada') && <button className='btn btn-danger' onClick={()=>handleRemove(p.id,order.id)}>X</button>}
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
                {user ? <h4>Precio Total:</h4> : <h4>Usuario: {order.user.email}</h4>}
                <div className="left">
                    <div className="details">
                    <p className='priceproductcard' >${total}</p>
                    </div>
                    {!user && (status === 'creada' ?
                    <button className="btn btn-light pill-rounded" onClick={() => handleProcess(order)} >Procesar</button> 
                    :
                        status === 'procesando' ?
                    <button className="btn btn-light pill-rounded" onClick={() => handleComplete(order)}>Completar</button>
                    : 
                        status === 'completa' ?
                    <h3><span className="badge badge-success" >Completa</span> </h3>
                    :
                    <h3><span className="badge badge-danger">Cancelada</span></h3>
                    )}
                    {status !== 'cancelada' && <button className="btn btn-danger pill-rounded" onClick={() => handleCancel(order)} >Cancelar</button>}
                    {order.checkouts[0] && <button className="btn btn-success pill-rounded" onClick={toggle}>Datos de envío</button>}
                </div>
            </div>
            {/*----------------------------------------*/}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} className='box-title check-orden'>
                    
                        <ModalBody style={{fontWeight:'normal'}}>
                            <h3 style={{textAlign:'center',width:'100%'}}>Datos de envío</h3>
                            <h4>Estado de pago: {order.checkouts[0].status}</h4>
                            <div /* className='cate-form' */>
                                <label><b>Provincia:</b> {order.checkouts[0] && order.checkouts[0].provincia}</label>
                            </div>
                            <div /* className='cate-form' */>
                                <label><b>Departamento:</b> {order.checkouts[0] && order.checkouts[0].departamento}</label>
                            </div>
                            <div /* className='cate-form' */>
                                <label><b>Localidad:</b> {order.checkouts[0] && order.checkouts[0].localidad}</label>
                            </div>
                            <div /* className='input-form' */>
                                <label><b>Dirección:</b> {order.checkouts[0] && order.checkouts[0].direccion}</label>
                            </div>
                            <div /* className='input-form' */>
                                <label><b>Email:</b> {order.checkouts[0] && order.checkouts[0].email}</label>
                            </div>
                            <div /* className='input-form' */>
                                <label><b>Teléfono:</b> {order.checkouts[0] && order.checkouts[0].telefono}</label>
                            </div>
                        </ModalBody>
                </ModalHeader>
            </Modal>
        </div>
    )
}

export default Orden;