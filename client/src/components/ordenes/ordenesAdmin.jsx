import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Orden from '../ordenes/orden';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ListGroup, ListGroupItem, Badge, Modal } from 'reactstrap';
import './ordenesAdmin.css'

const OrderTable = () => {

  const [orders, setOrders ] = useState([]);
  const [order, setOrder] = useState();  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getOrders()
  }, []);
  
  const getOrders = async () => {
    const data = await axios.get('http://localhost:3001/orders')   
    setOrders(data.data);
  } 

  return (
    // <div>
      <ListGroup>
        {
          orders && orders.map((order) => (
            <ListGroupItem tag="button" action>
            <Badge pill>{order.id}</Badge>
            {'   ' + order.status.toUpperCase()}
            <button className="btn btn-secondary m-3" onClick={toggle}>Detalle</button>
              <Modal isOpen={modal} toggle={toggle}>
                <Orden order={order} />
              </Modal>
            </ListGroupItem>         
          ))
        }    
      </ListGroup>
      // </div>
  );

}


//   return (
//     <div>
//       <div className='tabla'>      
//         <table className='table table-hover'>
//           <thead>
//             <tr className='table table-hover'>
//               <th>Id</th>
//               <th>Estado</th>      
//             </tr>
//           </thead>
//           <tbody> 
//             {
//               orders && orders.map(order => (
//                 <tr>
//                   <td className= 'table table-responsive'>{order.id}</td>
//                 </tr>
//               ))
//             }
            
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

export default OrderTable;