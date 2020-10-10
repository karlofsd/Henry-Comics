import React from 'react'
import AgregarCategorias from '../categoryAdmin/AgregarCategorias'
import ProductsCrud from '../productAdmin/ProductsCrud'

const Admin = ({newProd,newCat,get}) => {
    return(
        <div>
            <AgregarCategorias newCat={newCat}/>
            <ProductsCrud newProd={newProd} get={get}/>
        </div>
    )
}

export default Admin;