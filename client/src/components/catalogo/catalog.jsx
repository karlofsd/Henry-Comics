import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import Filter from './filter/filter'
import axios from 'axios'
import Carrito from './carrito/carrito.jsx'
import './catalog.css'
import {useSelector, useDispatch} from 'react-redux'
import {filterCategory,getProducts} from '../../redux/productos'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Catalog({products,count,id/*filterStatus,setFilterStatus*/}) {
    const classes = useStyles();
    
    const status = useSelector( store => store.productState.statusFilter)
    /* const [filterProducts,setFilterProducts] = useState(products) */
    // const filterProducts = useSelector( store => store.productState.filterProducts)
    const dispatch = useDispatch()
    console.log('id from app' ,id)

    const [page,setPage] = useState(1)

    useEffect(() => {
        console.log(page)
        if(!status){
            console.log(id)
            if(id){
                dispatch(filterCategory(id,page))
            }else{
                dispatch(getProducts(page))
                console.log('render catalogo',products)
            }
        }
    },[status,id,page])
    
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

    const capitalize = (string) => {
        let splitted = string.split(' ');
        let str = [];
        splitted.forEach(element => {
            str.push(element.substring(0, 1).toUpperCase() + element.substring(1))          
        });
        str = str.join(' ');
        return str;
    }

    const handlePageChange = (event,value) => {
        setPage(value)
    }

    return (
    <div className='catalogo'>
        <div className='filter'>
            <Filter products = {products} status={status} id={id}/*  clean={clean} *//>
        </div>
        <div className='products'>
            <div>
                {products  && products.map(p =><ProductCard product={p} capitalize={capitalize}/>)}
            </div>
            <div className={classes.root} id='pagination'>
                <Pagination
                    className="my-3"
                    count={Math.ceil(count/3)}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </div>
        </div>
        <div className= 'carrito'>
            <Carrito />
        </div>
    </div>
    );
}