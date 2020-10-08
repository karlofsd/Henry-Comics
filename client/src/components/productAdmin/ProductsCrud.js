import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader }from 'reactstrap';

const ProductsCrud = ({newProd}) =>{
    //estado:
    const [insertarProducto, setInsertarProducto] = useState(false)
    const [eliminarProducto, setEliminarProducto] = useState(false)
    const [tipoAccion, setTipoaccion] = useState(null)
    const [producto,setProducto] =useState({
        nombre: '',
        autor:'',
        año:'',
        editorial:'',
        precio:'',
        stock:'',
        descripcion:'',
        imagen:''
    });

    const handleInputChange =(e)=>{
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(producto)
        setInsertarProducto(false)
    }

    const handleChange =()=>{ // Aqui se va definir que tipo de boton tendra el form si es asgregar o actualizar 
        setTipoaccion('agregar');
        setInsertarProducto(true);
    }
    return (
        <div>
            <button className="btn btn-success" onClick={()=>handleChange()} >Agrgar producto</button> {/* Abre una  ventana con el formulario para agregar prductos */}
            <div>
                <table className='table '>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td> {/* cambiar por map */}
                            <td><img src='' /></td>
                            <td>Batman</td>
                            <td>50</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>{setInsertarProducto(true)}}>Editar</button>
                                <button className="btn btn-danger" onClick={()=>{setEliminarProducto(true)}}>Eliminar</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal isOpen={insertarProducto}>
                <ModalHeader>
                    <form className="form-group" onSubmit={onSubmit}>
                        <ModalBody>
                            <label>Nombre:</label><br />
                            <input type='text' name='nombre' onChange={handleInputChange} />
                            <br />
                            <label>Autor:</label><br />
                            <input type='text' name='autor' onChange={handleInputChange} />
                            <br />
                            <label>Año:</label><br />
                            <input type='text' name='año' onChange={handleInputChange} />
                            <br />
                            <label>Editorial:</label><br />
                            <input type='text' name='editorial' onChange={handleInputChange} />
                            <br />
                            <label>Precio:</label><br />
                            <input type='text' name='precio' onChange={handleInputChange} />
                            <br />
                            <label>Stock:</label><br />
                            <input type='text' name='stock' onChange={handleInputChange} />
                            <br />
                            <label>Descripción:</label><br />
                            <textarea name='descripcion' onChange={handleInputChange}/>
                            <br />
                            <label>Imagen:</label>
                            <input type='file' accept='image/*' name='imagen' onChange={handleInputChange}/>
                            <label>Categoria</label>
                        </ModalBody>
                        <ModalFooter>
                            {tipoAccion === 'agregar'?
                                <button className="btn btn-success" type='submit' onClick={()=>newProd(producto)}>Agregar</button>:
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
                    <button className="btn btn-danger" >Si</button>
                    <button  className="btn btn-secundary" onClick={()=>{setEliminarProducto(false)}}>No</button>
                </ModalFooter>

            </Modal>

        </div>
    )

}

export default ProductsCrud;