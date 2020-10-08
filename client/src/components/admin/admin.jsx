import React from 'react'
import AgregarCategorias from '../categoryAdmin/AgregarCategorias'
import ProductsCrud from '../productAdmin/ProductsCrud'

const Admin = ({newProd,newCat}) => {
    return(
        <div>
            <AgregarCategorias newCat={newCat}/>
            <ProductsCrud newProd={newProd}/>
        </div>
    )
}

export default Admin;