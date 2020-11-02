import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Catalog from "./components/catalogo/catalog";
import Product from "./components/productComponent/product";
import Admin from "./components/admin/admin";
import UserForm from "./components/userForm/userForm";
import LandingCarrousel from "./components/carrousel/carrousel";
import News from "./components/newsgrid/newsgrid";
import Footer from "./components/footer/footer";
import User from "./components/userPanel/userPanel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; //hooks
import { getProducts } from "./redux/productos"; //actions
import Login from "./components/userForm/login";
import { verifyLogin } from "./redux/users";
import denegado from "./403.png";
import Payment from "./components/checkout/paymentCard";
import SearchAPI from "./components/catalogoAPI/busquedaAPI";

import RecuperarPass from './components/recuperarPass/recuperarPass'

function App() {
    // ---funciones Redux---
    const dispatch = useDispatch();
    const user = useSelector((store) => store.userState.userLogin);
    const products = useSelector((store) => store.productState.products);
    const checkID = useSelector((store) => store.carritoState.checkPending);
    let onlyStock = products.filter((p) => p.stock > 0);
    //const status = useSelector( store => store.productState.statusFilter)
    // const [products, setProducts] = useState(); // ELIMINAR
    // const [categories, setCategories] = useState(); // ELIMINAR
    // const [filterStatus, setFilterStatus] = useState(false) //ELIMINAR

    useEffect(() => {
        /* dispatch(getProducts())
    getCategories(); */
        console.log("app render");
        if (!user.login) {
            dispatch(verifyLogin());
        }
    }, [user]);

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
            <NavBar /* categories={categories}  */ /* click={clickEnter} */ />
            <Route exact path="/" render={() => <LandingCarrousel />} />
            <Route exact path="/" render={() => <News />} />
            <Route exact path="/" render={() => <Footer />} />
            <Route
                exact
                path="/catalogo"
                render={() => (
                    <Catalog
                        products={
                            onlyStock
                        } /* status={status} */ /*  filterStatus={filterStatus} setFilterStatus={setFilterStatus} */
                    />
                )}
            />
            <Route
                exact
                path="/catalogo/category/:id"
                render={({ match }) => {
                    return (
                        <Catalog
                            id={Number(match.params.id)}
                            products={
                                onlyStock
                            } /* status={status} */ /* filterStatus={filterStatus} setFilterStatus={setFilterStatus} */
                        />
                    );
                }}
            />
            <Route
                exact
                path="/catalogo/search"
                render={({ location }) => (
                    <Catalog
                        products={onlyStock}
                        /* status={status} */ search={
                            location.search.split("=")[1]
                        } /*  filterStatus={filterStatus} setFilterStatus={setFilterStatus} */
                    />
                )}
            />
            <Route
                exact
                path="/product/:id"
                render={({ match }) => <Product id={Number(match.params.id)} />}
            />
            <Route
                exact
                path="/admin"
                render={() =>
                    user.login && user.isAdmin ? (
                        <div>
                            <Admin /* newCat={getCategories}  get={getProducts} /* getCat={getCategories} */ /*  categories={categories} */
                            />
                        </div>
                    ) : (
                        <div className="denied">
                            <img src={denegado} atl="403" />
                        </div>
                    )
                }
            />

            <Route
                exact
                path="/signup"
                render={() => (
                    <div>
                        <UserForm />
                    </div>
                )}
            />

            <Route
                exact
                path="/login"
                render={() => (
                    <div>
                        <Login />
                    </div>
                )}
            />

            <Route
                exact
                path="/user"
                render={() =>
                    user.login ? (
                        <User />
                    ) : (
                        <div className="denied">
                            <img src={denegado} atl="403" />
                        </div>
                    )
                }
            />

      <Route
        exact path='/payment'
        render={({location})=> 
          <Payment 
            status={location.search.split('=')[1].split('&')[0]} 
            checkID={location.search.split('=')[3]}
            ordenID={location.search.split('=')[2].split('&')[0]}
          />}
      />

      <Route
        exact path='/resetPass'
        render={({location})=> 
          <RecuperarPass
            id={location.search.split('=')[1]}
          />}
      />

<Route
        exact path='/searchWish'
        render={()=> <SearchAPI />}
      />
    </Router>
    
  );
}

export default App;
