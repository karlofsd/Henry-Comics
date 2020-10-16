import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Orden from '../ordenes/orden';
import 'bootstrap/dist/css/bootstrap.min.css';


const OrderTable = () => {  
  
  return (
    <div>
      <div className='tabla'>      
        <table className='table table-hover'>
          <thead>
            <tr className='table table-hover'>
              <th>Id</th>
              <th>Estado</th>
              <th>Items</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody> 
            <Orden />         
            {/* map */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable;