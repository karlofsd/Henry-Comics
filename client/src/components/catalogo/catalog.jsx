import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import Filter from './filter/filter'
import axios from 'axios'
import './catalog.css'
import './carrito.css'

export default function Catalog({products,id,filterStatus,setFilterStatus}) {
    const [filterProducts,setFilterProducts] = useState(products)

    useEffect(() => {
        if(!filterStatus){
            if(id){
                console.log('alert')
                newFilter()
            }else{
                setFilterProducts(products)
                console.log('render catalogo',products)
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
            <Filter products={filterProducts} status={filterStatus} filter={filter} clean={clean}/>
        </div>
        <div className='products'>
            {filterProducts && filterProducts.map(p =><ProductCard product={p}/>)}
        </div>
        <div className='carrito'>
            <h3 className='title-carrito'>Carrito</h3>
            <div>
                <ul className='list-carrito'>
                    <label>Producto: </label>
                    <li className='item-carrito'>
                        <div className='lab-inp-but'>
                            <label>item 1</label>
                            <input className='inc-dec' type='number' min='1' step='1'/>
                            <button className='end-but'>x</button>
                        </div>
                    </li>
                    <li className='item-carrito'>
                    <div className='lab-inp-but'>
                            <label>item 2</label>
                            <input className='inc-dec' type='number' min='1' step='1'/>
                            <button className='end-but'>x</button>
                        </div>
                    </li>
                    <li className='item-carrito'>
                    <div className='lab-inp-but'>
                            <label>item 3</label>
                            <input className='inc-dec' type='number' min='1' step='1'/>
                            <button className='end-but'>x</button>
                        </div>
                    </li>
                </ul>
                <ul className='list-carrito'>
                    <label>Envio: </label>
                    <li className='item-carrito'>
                        <label>En Puerta</label>
                        <input type= 'checkbox'></input>
                    </li>
                    <li className='item-carrito'>
                        <label>A Sucursal</label>
                        <input type= 'checkbox'></input>
                    </li>
                </ul>
            </div>
            <div className='total'>
                <label>Producto + Envio</label>
                <label>Total: $500</label>
            </div>
            <div className='buttons'>
                <button>Comprar</button>
                <button>Cancelar</button>
            </div>
        </div>
    </div>
    );
}