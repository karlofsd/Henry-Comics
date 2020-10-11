import React from 'react'
import AgregarCategorias from '../categoryAdmin/AgregarCategorias'
import ProductsCrud from '../productAdmin/ProductsCrud'

const Admin = ({newCat,get,categories,getCat}) => {
    return(
        <div>
            <AgregarCategorias newCat={newCat} categories={categories} getCat={getCat}/>
            <ProductsCrud get={get}/>
        </div>
    )
}

export default Admin;