import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem, Badge} from 'reactstrap';
import Select from "react-select";
import Orden from '../ordenes/orden';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './ordenesAdmin.css'

const OrderTable = () => {

  const [orders, setOrders ] = useState([]);
  const [order, setOrder ] = useState();
  const [status, setStatus] = useState();
    
  // const [modal, setModal] = useState(false);
  const toggle = (order) => {
    // setModal(!modal);
    setOrder(order);
  }

  useEffect(() => {
    getOrders(status)
  }, [status]);
  
  const getOrders = async (status) => {
    let query = '';
    if (status) {query = `?status=${status}`};
    const data = await axios.get(`http://localhost:3001/orders${query}`);   
        
    setOrders(data.data);
  } 

  const handleStatus = (e) => {       
    setStatus(e.target.value);
    setOrder()
  }

  return (
    <div>
      <div className='gral-order'>
        <div className='estados-select'>
          <div class="btn-group-vertical">
            <button type="button" class="btn btn-secondary" onClick={handleStatus}>Todas</button>
            <button type="button" class="btn btn-secondary" value='carrito' onClick={handleStatus}>Carrito</button>
            <button type="button" class="btn btn-secondary" value='creada' onClick={handleStatus}>Creada</button>
            <button type="button" class="btn btn-secondary" value='procesando' onClick={handleStatus}>Procesando</button>
            <button type="button" class="btn btn-secondary" value='completa' onClick={handleStatus}>Completa</button>
            <button type="button" class="btn btn-secondary" value='cancelada' onClick={handleStatus}>Cancelada</button>
          </div> 
        </div>
        <div className='lista-orden'>
        <ListGroup>
          {
            orders && orders.map((order) => (
              <ListGroupItem tag="button" onClick={() => toggle(order)}>
              <Badge pill>{order.status}</Badge>
              {'Orden # '+ order.id}
              <span>{order.createdAt.split('T')[0].replace(/-/gi,'/').replace(/(\w+)\/(\w+)\/(\w+)/,"$3/$2/$1")}</span>        
              </ListGroupItem>         
            ))
          }    
        </ListGroup>
        </div>
        <div className='detalle-orden'>
        { 
          order && <Orden order={order} />              
        }
        </div>
      </div>
    </div>
  )
}

export default OrderTable;