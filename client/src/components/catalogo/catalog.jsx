import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import axios from 'axios'

export default function Catalog({products,id}) {
    
    const [filterProducts,setFilterProducts] = useState()

    useEffect(() => {
        if(id){
            console.log('alert')
            newFilter()
        }else{
            setFilterProducts(products)
        }
    },[])
    
    const newFilter = async() => {
        const {data} = await axios.get(`http://localhost:3001/products/category/${id}`)
        setFilterProducts(data)
    }

    return (
    <div>
       {filterProducts && filterProducts.map(p =><ProductCard product={p}/>)}
    </div>
    );
}