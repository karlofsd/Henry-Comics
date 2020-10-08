import React from 'react';
import ProductCard from '../productComponent/productCard.jsx'

export default function Catalog({products}) {
    return (
    <div>
       {products && products.map(p =><ProductCard product={p}/>)}
    </div>
    );
}