import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Catalog from "./components/catalogo/catalog";
import Product from "./components/productComponent/product";
import Admin from "./components/admin/admin";
import LandingCarrousel from "./components/carrousel/carrousel";
import Footer from "./components/footer/footer";
import axios from "axios";
import {useDispatch,useSelector} from 'react-redux'  //hooks
import {getProducts} from './redux/productos'        //actions

function App() {
  // ---funciones Redux---
  const dispatch = useDispatch() 
  const products = useSelector( store => store.productState.products)
             
  // const [products, setProducts] = useState(); // ELIMINAR
  // const [categories, setCategories] = useState(); // ELIMINAR
  // const [filterStatus, setFilterStatus] = useState(false) //ELIMINAR

  useEffect(() => {
    /* dispatch(getProducts())
    getCategories(); */
    console.log('app render')
  },[products]);

  //---ELIMINAR---
  // const getProducts = async () => {
  //   const { data } = await axios.get(`http://localhost:3001/products/`);
  //   setProducts(data);
  //   console.log('productos')
  // };
  
  /* const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:3001/category/`);
    setCategories(data);
  }; */
  //-------------

  /* const createCategory = async(e) => {
    const {data} = await axios.post('http://localhost:3001/category',e)
    alert(data.message)
    getCategories()
  }

  const createProduct = async(e) => {
    const {data} = await axios.post('http://localhost:3001/products/create',e)
    alert(data.message)
    getProducts()
  } */

  return (
    <Router>
      <NavBar /* categories={categories}  *//* click={clickEnter} */ get={getProducts} />
      <Route
        exact
        path="/"
        render={() => <LandingCarrousel />}
      />
      <Route
        exact
        path="/"
        render={() => <Footer />}
      />
      <Route
        exact
        path="/catalogo"
        render={() => <Catalog products={products}/*  filterStatus={filterStatus} setFilterStatus={setFilterStatus} *//>}
      />
      <Route
        exact
        path="/catalogo/category/:id"
        render={({ match }) => {
          return <Catalog id={Number(match.params.id)} products={products}/* filterStatus={filterStatus} setFilterStatus={setFilterStatus} *//>
        }}
      />
      <Route
        exact
        path="/product/:id"
        render={({ match }) => <Product id={Number(match.params.id)} />}
      />
      <Route 
        exact path="/admin" 
        render={() => 
          <div>
            <Admin /* newCat={getCategories}  get={getProducts} /* getCat={getCategories} *//*  categories={categories} *//> 
          </div>}
      />
    </Router>
  );
}

export default App;
