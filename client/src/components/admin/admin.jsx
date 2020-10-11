import React from 'react'
import AgregarCategorias from '../categoryAdmin/AgregarCategorias'
import ProductsCrud from '../productAdmin/ProductsCrud'
import { BrowserRouter  as Router, Route, Link} from 'react-router-dom'
import './admin.css'

const Admin = ({newProd,newCat,get}) => {
    return(
        <Router >
                <div className= 'cPanel'>
                    <Link to = '/admin/category'>
                        <h4>Categorias</h4>
                    </Link>
                    <Link to = '/admin/product'>
                        <h4>Productos</h4>
                    </Link>
                </div>
                <div className= 'boxContent'>
                    <Route
                        exact path = '/admin/category'
                        render = {()=>
                            <AgregarCategorias newCat={newCat}/>
                        }
                    />
                    <Route
                        exact path = '/admin/product'
                        render = {()=>
                            <ProductsCrud newProd={newProd} get={get}/>
                        }
                    />
                </div>
        </Router>
    )
}

export default Admin;