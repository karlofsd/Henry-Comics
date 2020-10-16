import React from 'react';
import AgregarCategorias from '../categoryAdmin/AgregarCategorias';
import ProductsCrud from '../productAdmin/ProductsCrud';
import OrderTable from '../ordenes/ordenesAdmin';
import { BrowserRouter  as Router, Route, Link} from 'react-router-dom';
import './admin.css';

  const Admin = ({/*newCat,get,categories,getCat*/}) => {
    return(
        <Router >
            <div class="col d-flex justify-content-left bg-rojo">
                <ul class="nav">
                    <div className="row cPanel-categorias">
                        <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                            <Link to = '/admin/category' className="text-decoration-none"><h4>Categorias</h4></Link>
                        </a>
                    </div>
                    <div className="row cPanel-productos">
                        <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                            <Link to = '/admin/product' className="text-decoration-none"><h4>Productos</h4></Link>
                        </a>
                    </div>
                    <div className="row cPanel-ordenes">
                        <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                            <Link to = '/admin/ordenes' className="text-decoration-none"><h4>Ordenes</h4></Link>
                        </a>
                    </div>
                </ul>
            </div>            
            <div>
                <div>
                    <Route
                        exact path = '/admin/category'
                        render = {()=>
                            <AgregarCategorias                                                              /> //SE BORRAN LAS PROPS
                        }                  /* newCat={newCat} categories={categories} getCat={getCat} */
                    />
                </div>
                <div>
                    <Route
                        exact path = '/admin/product'
                        render = {()=>
                            <ProductsCrud /> 
                            // get={get} (exProps)
                            //SE BORRAN LAS PROPS
                        }
                    />
                </div>
                <div>
                    <Route
                        exact path = '/admin/ordenes'
                        render = {()=>
                            <OrderTable /> 
                            // get={get} (exProps)
                            //SE BORRAN LAS PROPS
                        }
                    />
                </div>
            </div>
        </Router>
    )
}

export default Admin;