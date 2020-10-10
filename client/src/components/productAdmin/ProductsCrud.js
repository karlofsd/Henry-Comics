import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import FormCrud from './FormCrud';

const url = 'http://localhost:3001/products';
const urlCategori ='http://localhost:3001/category/';

const ProductsCrud = () =>{

    //estado:
    const [productGet, setProductGet]=useState([]);
    const [categoria,setCategoria] = useState([])
    const [insertarProducto, setInsertarProducto] = useState(false)
    const [eliminarProducto, setEliminarProducto] = useState(false)
    const [tipoAccion, setTipoaccion] = useState(null)
    const [idProduct, setIdProduct] = useState(null)
    const [producto,setProducto] =useState({});


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
        console.log(productGet)
        setTipoaccion(null);
        setInsertarProducto(true);
        setCategoria(ele.categories)
        setProducto(ele);
    }
    return (
        <div>
            <button className="btn btn-success" onClick={()=>handleChange()} >Agrgar producto</button> {/* Abre una  ventana con el formulario para agregar prductos */}

            <div>
                <table className='table '>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productGet.map(ele=>(
                            <tr>
                            <td>{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.price}</td>
                            <td>{ele.stock}</td>
                            <td>
                            <button className="btn btn-primary" onClick={()=>{hangleChangeEdit(ele)}} >Editar</button>
                            <button className="btn btn-danger" onClick={()=>{handleChangeDelete(ele.id)}}>Eliminar</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <FormCrud 
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
            />

        </div>
    )

}

export default ProductsCrud;