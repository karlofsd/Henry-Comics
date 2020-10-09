import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Select from "react-select";
import {Modal, ModalBody, ModalFooter, ModalHeader }from 'reactstrap';

const url = 'http://localhost:3001/products';
const urlCategori ='http://localhost:3001/category/';

const ProductsCrud = () =>{

    let opcion =[];
    const [categoria,setCategoria] = useState([])
    //estado:
    const [productGet, setProductGet]=useState([]);
    const [insertarProducto, setInsertarProducto] = useState(false)
    const [eliminarProducto, setEliminarProducto] = useState(false)
    const [tipoAccion, setTipoaccion] = useState(null)
    const [idProduct, setIdProduct] = useState(null)
    const [producto,setProducto] =useState({
        name: '',
        author:'',
        editorial:'',
        year:'',
        price:'',
        stock:'',
        description:'',
        image:''
    });

    //Peticion a la api---------------------------------------------------------------------------------
    const getCategories = async()=>{
        await axios.get(urlCategori)
        .then(result=>{
            setCategoria(result.data)
        })
    }

    const productGetApi= async()=>{
        await axios.get(url)
        .then(result=>{
            setProductGet(result.data)
        })
    }

    const peticionPostProducto=async()=>{
        await axios.post(`${url}/create`, producto)
        .then(response=>{
            productGetApi();
            setInsertarProducto(false)
        })
    }

    const peticionPut=async()=>{
        await axios.put(`${url}/${producto.id}`, producto)
        .then(response=>{
          productGetApi();
          setInsertarProducto(false)
        })
    }
    

    const producDelete=async()=>{
        await axios.delete(`${url}/${idProduct}`)
        .then(response=>{
            setProductGet(productGet.filter(producto=>producto.id!==idProduct));
            setEliminarProducto(false)
        })
    }
    



    useEffect(()=>{
        productGetApi();

    },[])
    //-------------------------------------------------------------------------

    //Select de categorias para agregar al producto
    const [selectedOption, setSelectedOption] = useState(null);

    //aqui va a pushear el nombre de la categoria y el id para que el select react los lea bien
    if(categoria.length>0){
        categoria.map(e=>{opcion.push({ value: e.name, label: e.name, id:e.id })})
    }
    //---------------------------------------------------------

    const handleInputChange =(e)=>{//toma el value del input
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e)=>{ //las acciones para agregar producto o actualizar.
        e.preventDefault();
        if(tipoAccion==='agregar'){
            peticionPostProducto(producto);
        }else{
            peticionPut();
        }
        console.log(selectedOption)
        setInsertarProducto(false)
    }

    const handleChange =()=>{ // Aqui se va definir que tipo de boton tendra el form si es asgregar o actualizar 
        setTipoaccion('agregar');
        setInsertarProducto(true);
        setProducto({
            name: '',
            author:'',
            editorial:'',
            year:'',
            price:'',
            stock:'',
            description:'',
            image:''
        })
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

            <Modal isOpen={insertarProducto}>
                <ModalHeader>
                    <form className="form-group" onSubmit={onSubmit}>
                        <ModalBody>
                            <label>Nombre:</label><br />
                            <input type='text' name='name' onChange={handleInputChange} value={producto && producto.name}/>
                            <br />
                            <label>Autor:</label><br />
                            <input type='text' name='author' onChange={handleInputChange} value={producto && producto.author}/>
                            <br />
                            <label>Año:</label><br />
                            <input type='text' name='year' onChange={handleInputChange} value={producto && producto.year}/>
                            <br />
                            <label>Editorial:</label><br />
                            <input type='text' name='editorial' onChange={handleInputChange} value={producto && producto.editorial}/>
                            <br />
                            <label>Precio:</label><br />
                            <input type='text' name='price' onChange={handleInputChange} value={producto && producto.price}/>
                            <br />
                            <label>Stock:</label><br />
                            <input type='text' name='stock' onChange={handleInputChange} value={producto && producto.stock}/>
                            <br />
                            <label>Descripción:</label><br />
                            <textarea name='description' onChange={handleInputChange} value={producto && producto.description}/>
                            <br />
                            <label>Imagen:</label>
                            <input type='file' accept='image/*' name='image' onChange={handleInputChange} />
                            <label>Categoria</label>
                            <Select
                                isMulti
                                name="categorias"
                                options={opcion}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={setSelectedOption}
                            />
                        </ModalBody>
                        <ModalFooter>
                            {tipoAccion === 'agregar'?
                                <button className="btn btn-success" type='submit'>Agregar</button>:
                                <button className="btn btn-primary" type='submit'>Editar</button>   
                                }
                            <button type='button' className="btn btn-secundary" onClick={()=>{setInsertarProducto(false)}}>Cancelar</button>
                        </ModalFooter>
                    </form>
                </ModalHeader>
            </Modal>

            <Modal isOpen={eliminarProducto}>
                <ModalBody>
                    Estás seguro que deseas eliminar el producto
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>{producDelete()}}>Si</button>
                    <button  className="btn btn-secundary" onClick={()=>{setEliminarProducto(false)}}>No</button>
                </ModalFooter>

            </Modal>

        </div>
    )

}

export default ProductsCrud;