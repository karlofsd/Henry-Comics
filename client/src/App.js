import React, { useEffect, useState } from "react";
import NavBar from "./components/navBar/navBar";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Catalog from "./components/catalogo/catalog";
import Product from "./components/productComponent/product";
import Admin from "./components/admin/admin";
import LandingCarrousel from "./components/carrousel/carrousel"
import axios from "axios";

function App() {

  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProducts();
    getCategories();
    console.log('app render')
  },[]);

  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:3001/products/`);
    setProducts(data);
    console.log('productos')
  };

  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:3001/category/`);
    setCategories(data);
  };

  const clickEnter = async (e) => {
    const { data } = await axios.get(
      `http://localhost:3001/products/search?text=${e}`
    );
    setProducts(data);
  };

  const createCategory = async(e) => {
    const {data} = await axios.post('http://localhost:3001/category',e)
    alert(data.message)
    getCategories()
  }

  const createProduct = async(e) => {
    const {data} = await axios.post('http://localhost:3001/products/create',e)
    alert(data.message)
    getProducts() 
  }

  return (
    <Router>
      <NavBar categories={categories} click={clickEnter} />
      <Route
        exact
        path="/"
        render={() => <LandingCarrousel />}
      />
      <Route
        exact
        path="/catalogo"
        render={() => <Catalog products={products} />}
      />
      <Route
        exact
        path="/catalogo/category/:id"
        render={({ match }) => (
          <Catalog id={Number(match.params.id)} />
        )}
      />
      <Route
        exact
        path="/product/:id"
        render={({ match }) => <Product id={Number(match.params.id)} />}
      />
      <Route 
        exact path="/admin" 
        render={() => 
        <Admin newCat={getCategories} get={getProducts} getCat={getCategories} categories={categories}/>} 
      />
    </Router>
  );
}

export default App;
