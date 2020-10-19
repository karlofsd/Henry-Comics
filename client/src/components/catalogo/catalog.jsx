import React, { useEffect, useState } from 'react';
import ProductCard from '../productComponent/productCard.jsx'
import Filter from './filter/filter'
import axios from 'axios'
import Carrito from './carrito/carrito.jsx'
import './catalog.css'
import {useSelector, useDispatch} from 'react-redux'
import {filterCategory,findProducts,getProducts,clean} from '../../redux/productos'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import { getCarrito } from '../../redux/carrito.js';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Catalog({products,id,/* status, */search}) {
    
    const classes = useStyles();
    const status = useSelector( store => store.productState.statusFilter)
    const dispatch = useDispatch()
    const user = useSelector(store => store.userState.userLogin)

    // -------PAGINACION-------
    const [page,setPage] = useState(1)
    const [paginated,setPaginated] = useState()
    const [pageStatus, setPageStatus] = useState(false)
    const limit = 4
    const counter = Math.ceil(products.length/limit)
    
    const paginator = (e) => {
        // console.log('paginando')
        let newArr = products.slice((e-1)*limit,limit*e)
        setPaginated(newArr)
        setPageStatus(false)
    }
    
    const handlePageChange = (event,value) => {
        setPage(value)
        setPageStatus(true)
    }
    // ---------------------------------------------

    useEffect(() => {
        // console.log('--------- render 1--------')
        if(!status){
            // console.log('status',status)
            // console.log(search)
            // console.log('page',pageStatus)
            const fetchData = async() => {
                if(id){
                    /* await */ dispatch(filterCategory(id))
                    // console.log('render category')
                    /* await */ return setPageStatus(true)
                }
                else if(search){
                    // console.log('buscando')
                    await dispatch(findProducts(search))
                    return setPageStatus(true)
                }
                else{
                    /* await */ dispatch(getProducts())
                    // console.log('render catalogo',products)
                    /* await */ return setPageStatus(true)
                }
            }
            fetchData()
            
        }
      
       /*  paginator(page) */
        // console.log('----------------------------')
    },[status,id,search])

    useEffect(()=>{
        // console.log('---------render 2-------')
        paginator(page)
        // console.log('----------------------')
    },[page,products])

    const capitalize = (string) => {
        let splitted = string.split(' ');
        let str = [];
        splitted.forEach(element => {
            str.push(element.substring(0, 1).toUpperCase() + element.substring(1))          
        });
        str = str.join(' ');
        return str;
    }

    return (
    <div className='catalogo'>
        <div className='filter'>
            <Filter products = {products} status={status} id={id} page={setPage} pageStatus={setPageStatus}/>
        </div>
        <div className='products'>
            <div className='products-content'>
                {paginated  && paginated.map(p =><ProductCard product={p} capitalize={capitalize}/>)}
            </div>
            <div className={classes.root} id='pagination'>
                <Pagination
                    className="my-3"
                    count={counter}
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
            <Carrito user = {user}/>
        </div>
    </div>
    );
}

// CODIGO ANTIGUO
/* const [filterProducts,setFilterProducts] = useState(products) */
// const filterProducts = useSelector( store => store.productState.filterProducts)
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