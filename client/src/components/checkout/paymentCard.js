import Axios from 'axios';
import React, { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Payment = ({status}) => {
    
    const [modal,setModal] = useState(false)
    const paymentUpdate = async() => {
        let check = JSON.parse(localStorage.getItem('checkout'))
        await Axios.put(`http://localhost:3001/orders/payment/${check[1]}?status=${status}`)
    }
    const toggle = () => setModal(!modal)
    const cancelado = async() => {
        let check = JSON.parse(localStorage.getItem('checkout'))
        await Axios.delete(`http://localhost:3001/orders/checkout/${check[1]}`)
        await Axios.put(`http://localhost:3001/orders/${check[0]}?status=carrito`)
    }

    useEffect(()=> {
        if(status === 'Cancelado'){
            cancelado()
        }else if(status === 'Pagado'){
            paymentUpdate()
            //aqui mi compra y mando me correo 
        }
        toggle()
    },[])

    return(
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                {(status ===  'Pagado') && '¡Gracias por su compra!, su orden será procesada.'}
                {(status ===  'Pendiente') && '¡Gracias por su compra!, su pago está pendiente.'}
                {(status ===  'Cancelado') && '¡Lo sentimos! La compra no se concretó, intente otra vez.'}
            </ModalHeader>
            <Link type='button' className='btn btn-dark' to='/catalogo'>Aceptar</Link>
        </Modal>
    )
}

export default Payment;