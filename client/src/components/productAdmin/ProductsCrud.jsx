import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FormCrud from './FormCrud';
import './productCrud.css';

const url = 'http://localhost:3001/products';
const urlCategori ='http://localhost:3001/category/';

const ProductsCrud = ({get}) =>{

    //estado:
    const [productGet, setProductGet]=useState([]);
    const [categoria,setCategoria] = useState([])
    const [insertarProducto, setInsertarProducto] = useState(false)
    const [eliminarProducto, setEliminarProducto] = useState(false)
    const [tipoAccion, setTipoaccion] = useState(null)
    const [idProduct, setIdProduct] = useState(null)
    const [producto,setProducto] =useState({});
    const [editCategory, setEditCategory] =useState([]);


    //Peticion a la api---------------------------------------------------------------------------------
    const productGetApi= async()=>{
        await axios.get(url)
        .then(result=>{
            setProductGet(result.data);
        })
    }

    const getCategories = async()=>{
        await axios.get(urlCategori)
        .then(result=>{
            setCategoria(result.data)
        })
    }

    useEffect(()=>{
        productGetApi();
    },[])


    const handleChange =()=>{ // Aqui se va definir que tipo de boton tendra el form si es asgregar o actualizar 
        setTipoaccion('agregar');
        setInsertarProducto(true);
        setProducto({})
        getCategories();
    }
    const handleChangeDelete =(id)=>{
        setEliminarProducto(true)
        setIdProduct(id)
    }
    const hangleChangeEdit = (ele)=>{
        setTipoaccion(null);
        setInsertarProducto(true);
        getCategories();
        setEditCategory(ele.categories)
        setProducto(ele);
    }


    return (
        <div>
            <button className="btn btn-secondary m-3" onClick={()=>handleChange()} >Agregar producto</button> {/* Abre una  ventana con el formulario para agregar prductos */}

            <div className='tablaProd'>
                <table className='table table-hover '>
                    <thead>
                        <tr className='table table-hover'>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>precio</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productGet.map(ele=>(
                            <tr>
                            <td>{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.price}</td>
                            <td>{ele.stock}</td>
                            <td className='table w-auto table-hover'>
                                <button className="btn btn-secondary btn-sm m-2 p-1" onClick={()=>{hangleChangeEdit(ele)}} >Editar</button>
                                <button className="btn btn-dark btn-sm m-2 p-1" onClick={()=>{handleChangeDelete(ele.id)}}>Eliminar</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FormCrud
                get={get}
                editIsOpen={insertarProducto}
                deleteIsOpen={eliminarProducto}
                tipoAccion={tipoAccion}
                productGetApi={productGetApi}
                product={producto}
                setProducto={setProducto}
                categoria={categoria}
                idProduct={idProduct}
                setProductGet={setProductGet}
                productGet={productGet}
                setInsertarProducto={setInsertarProducto}
                setEliminarProducto={setEliminarProducto}
                setCategoria={setCategoria}
                editCategory={editCategory}              
            />
        </div>
    )

}

export default ProductsCrud;