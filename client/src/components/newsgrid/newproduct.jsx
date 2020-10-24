import React from 'react';
import './newsgrid.css';


const NewProduct = (props) => {
  return (
    <div className="wrapper">
        <div><img src={props.product.image} className="img"/></div>
        <div className="description">
            <h3>{props.product.name}</h3>     
            <p>{props.product.description}</p>
        </div>
    </div>
  );
};

export default NewProduct;