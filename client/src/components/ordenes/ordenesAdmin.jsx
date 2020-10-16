import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Orden from '../ordenes/orden';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const OrderTable = () => {  
  
  // const orders = await axios.get()



  return (
    <ListGroup>
      <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
      <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
      <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
    </ListGroup>
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
//               <th>Items</th>
//               <th>Precio</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody> 
//             <Orden />         
//             {/* map */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

export default OrderTable;