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


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Catalog({products,id,status,search,location}) {
    
    const classes = useStyles();
    
    const dispatch = useDispatch()
    
    
    // -------PAGINACION-------
    const [page,setPage] = useState(1)
    const [paginated,setPaginated] = useState()
    const [pageStatus, setPageStatus] = useState(false)
    const limit = 2
    const counter = Math.ceil(products.length/limit)
    
    const paginator = (e) => {
        console.log('paginando')
        let newArr = products.slice((e-1)*limit,limit*e)
        setPaginated(newArr)/* 
        setPageStatus('paginando') */
        console.log(newArr)
    }
    
    const handlePageChange = (event,value) => {
        setPage(value)
        setPageStatus(true)
    }
    // ---------------------------------------------

    useEffect(() => {
        console.log('--------- render 1--------')
        console.log('status',status)
        console.log(search)
        console.log('page',pageStatus)
        if(!status && !pageStatus){
            const fetchData = async() => {
                if(id){
                    await dispatch(filterCategory(id))
                    await setPageStatus(true)
                }
                else if(search){
                    console.log('buscando')
                    dispatch(findProducts(search))
                }
                else{
                    await dispatch(getProducts())
                    await setPageStatus(true)
                    console.log('render catalogo',products)
                }
            }
            fetchData()
        }
        /* paginator(page) */
        console.log('----------------------------')
    },[status,id,pageStatus,search])

    useEffect(()=>{
        console.log('---------render 2-------')
        paginator(page) 
        console.log('----------------------')
    },[products,page])

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
            <div>
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
            <Carrito />
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