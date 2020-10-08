import React from 'react'
import AgregarCategorias from '../categoryAdmin/AgregarCategorias'
import ProductsCrud from '../productAdmin/ProductsCrud'

const Admin = () => {
    return(
        <div>
            <AgregarCategorias/>
            <ProductsCrud/>
        </div>
    )
}

export default Admin;