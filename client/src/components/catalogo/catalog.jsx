import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import Filter from './filter/filter'
import axios from 'axios'
import Carrito from './carrito/carrito.jsx'
import './catalog.css'
import {useSelector, useDispatch} from 'react-redux'
import {filterCategory,getProducts} from '../../redux/productos'

export default function Catalog({products,id/*filterStatus,setFilterStatus*/}) {
    const status = useSelector( store => store.productState.statusFilter)
    /* const [filterProducts,setFilterProducts] = useState(products) */
    // const filterProducts = useSelector( store => store.productState.filterProducts)
    const dispatch = useDispatch()
    console.log('id from app' ,id)
    useEffect(() => {
        console.log(status)
        if(!status){
            console.log(id)
            if(id){
                dispatch(filterCategory(id))
            }else{
                dispatch(getProducts())
                console.log('render catalogo',products)
            }
        }
    },[status,id])
    
    // PASAR A REDUX/PRODUCTOS
    // const newFilter = async() => {
    //     const {data} = await axios.get(`http://localhost:3001/products/category/${id}`)
    //     setFilterProducts(data)
    //     setFilterStatus(false)
    // }
    //---------------

    // const filter = (a,e) => {
    //     let newProducts = filterProducts.filter(f => f[e] === a)
    //     setFilterProducts(newProducts)
    //     setFilterStatus(true)
    // }

    // const clean = () => {
    //     setFilterStatus(false)
    // }

    return (
    <div className='catalogo'>
        <div className='filter'>
            <Filter products = {products} status={status} id={id}/*  clean={clean} *//>
        </div>
        <div className='products'>
            {console.log(products)}
            {products  && products.map(p =><ProductCard product={p}/>)}
        </div>
        <div className= 'carrito'>
            <Carrito />
        </div>
    </div>
    );
}