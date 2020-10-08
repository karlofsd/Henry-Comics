
import React from "react";
import NavBar from './components/navBar/navBar';
import "./App.css";
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Catalog from "./components/catalogo/catalog";
import Product from "./components/productComponent/product";
import Admin from "./components/admin/admin"

function App() {
    return (
        <Router>
            <NavBar />
            <Route
                exact path='/catalogo'
                render={() => <Catalog/>}
            />
            <Route
                exact path='/catalogo/category/:id'
                render={({match}) => <Catalog id={match.params.id}/>}
            />
            <Route
                exact path='/product/:id'
                render={({match}) => <Product id={match.params.id}/>}
            />
            <Route
                exact path='/admin'
                render={() => <Admin/>}
            />
        </Router>
    );

}

export default App;
