import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import Filter from './filter/filter'
import axios from 'axios'
import './catalog.css'

export default function Catalog({products,id}) {
    const [filterProducts,setFilterProducts] = useState(products)
    const [filterStatus, setFilterStatus] = useState(false)

    useEffect(() => {
        if(!filterStatus){
            if(id){
                console.log('alert')
                newFilter()
            }else{
                setFilterProducts(products)
            }
        }
    },[products,id,filterStatus])
    
    const newFilter = async() => {
        const {data} = await axios.get(`http://localhost:3001/products/category/${id}`)
        setFilterProducts(data)
        setFilterStatus(false)
    }

    const filter = (a,e) => {
        let newProducts = filterProducts.filter(f => f[e] === a)
        setFilterProducts(newProducts)
        setFilterStatus(true)
    }

    const clean = () => {
        setFilterStatus(false)
    }

    return (
    <div className='catalogo'>
        <div className='filter'>
            <Filter products={filterProducts} filter={filter} clean={clean}/>
        </div>
        <div className='products'>
            {filterProducts && filterProducts.map(p =><ProductCard product={p}/>)}
        </div>
        <div className='carrito'>
            <h3 className='title-carrito'>Carrito</h3>
            <div>
                <ul className='list-carrito'>
                    <li className='item-carrito'>
                        <label>item 1</label>
                        <button>x</button>
                    </li>
                    <li className='item-carrito'>
                        <label>item 2</label>
                        <button>x</button>
                    </li>
                    <li className='item-carrito'>
                        <label>item 3</label>
                        <button>x</button>
                    </li>
                </ul>
            </div>
            <div className='total'>
                <label>total: $500</label>
            </div>
            <div className='buttons'>
                <button>comprar</button>
                <button>vaciar</button>
            </div>
        </div>
    </div>
    );
}