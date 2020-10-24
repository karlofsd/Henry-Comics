import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/productos';
import NewProduct from './newproduct';
import './newsgrid.css';
import { Link } from 'react-router-dom';



export default function News() {

    const dispatch = useDispatch()
    const products = useSelector(store => store.productState.products)

    const[nuevosProductos, setNuevosProductos] = useState([])

    useEffect(()=>{
        dispatch(getProducts())  
        console.log(products) 
    },[])

    useEffect(() => {
        let productsIndex = products.length;
        let ultimosTres = products.slice(productsIndex - 3, productsIndex);
        setNuevosProductos(ultimosTres)
    },[products])

    return (   
    <div className="container-fluid grid">
        <h2 className="text-md-left font-weight-bold estrenos">ESTRENOS</h2>
        <div className="row">
            {nuevosProductos.map(p =><Link to={'/catalogo'}><div className="col-4"><NewProduct product={p}/></div></Link>)}
            </div>
        </div>
    
    )}   