import React, {useState} from 'react';
import Select from "react-select";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader }from 'reactstrap';

const url = 'http://localhost:3001/products';


                
const FormCrud=({get,editIsOpen,deleteIsOpen,tipoAccion, productGetApi, product, setProducto,categoria, idProduct,setProductGet, productGet,setInsertarProducto,setEliminarProducto})=>{
    
    let opcion =[];

    const [selectedOption, setSelectedOption] = useState([]);

    const peticionPostProducto=async()=>{
        await axios.post(`${url}/create`, product)
        .then(response=>{
            postCategoriProduct(response.data.newProduct.id);
        })
    }

    const postCategoriProduct = async (idProduct)=>{
        await selectedOption.forEach(ele=>{
            axios.post(`${url}/${idProduct}/category/${ele.id}`)
            .then(response=>{
                productGetApi()
            })
         });
         
         setInsertarProducto(false);
         get()
    }

    const deleteCategoriProduc = async ()=>{
        await selectedOption.forEach(ele=>{
            axios.delete(`${url}/${product.id}/category/${ele.id}`)
        })
        get()
    }

    const peticionPut=async()=>{
        await axios.put(`${url}/${product.id}`, product)
        .then(response=>{
          productGetApi();
          setInsertarProducto(false);
        })
        get()
    }

    const producDelete=async()=>{
        await axios.delete(`${url}/${idProduct}`)
        .then(response=>{
            setProductGet(productGet.filter(producto=>producto.id!==idProduct));
            setEliminarProducto(false);
        })
        get()
    }


    if(categoria.length>0){
        categoria.forEach(e=>{opcion.push({ value: e.name, label: e.name, id:e.id })})
    }

    const uploadImage = async (e) => {

        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64)
        setProducto({
            ...product,
            image:base64});
        e.preventDefault();
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };





    const handleInputChange =(e)=>{//toma el value del input
        setProducto({
            ...product,
            [e.target.name] : e.target.value.toLowerCase()
        })
    }

    const onSubmit = (e)=>{ //las acciones para agregar producto o actualizar.
        e.preventDefault();
        if(tipoAccion==='agregar'){
            peticionPostProducto();
            setProducto({});
        }else{
            peticionPut();
            deleteCategoriProduc()
        }
        setInsertarProducto(false);
        get()
    }


    return(
        <div>
            
            <Modal isOpen={editIsOpen}>
                <ModalHeader>
                    <form className="form-group" onSubmit={onSubmit}>
                        <ModalBody>
                            <label>Nombre:</label><br />
                            <input type='text' name='name' onChange={handleInputChange} value={product && product.name}/>
                            <br />
                            <label>Autor:</label><br />
                            <input type='text' name='author' onChange={handleInputChange} value={product && product.author}/>
                            <br />
                            <label>Año:</label><br />
                            <input type='text' name='year' onChange={handleInputChange} value={product && product.year}/>
                            <br />
                            <label>Editorial:</label><br />
                            <input type='text' name='editorial' onChange={handleInputChange} value={product && product.editorial}/>
                            <br />
                            <label>Precio:</label><br />
                            <input type='text' name='price' onChange={handleInputChange} value={product && product.price}/>
                            <br />
                            <label>Stock:</label><br />
                            <input type='text' name='stock' onChange={handleInputChange} value={product && product.stock}/>
                            <br />
                            <label>Descripción:</label><br />
                            <textarea name='description' onChange={handleInputChange} value={product && product.description}/>
                            <br />
                            <label>Imagen:</label>
                            <input type='file' /* accept='image/*' */ name='image' onChange={uploadImage} />
                            {tipoAccion === 'agregar'?
                                <label>Categoría:</label>:
                                <label>Eliminar categoría:</label>
                            }
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
                            <button type='button' className="btn btn-secundary" onClick={()=>setInsertarProducto(false)}>Cancelar</button>
                        </ModalFooter>
                    </form>
                </ModalHeader>
            </Modal>

            <Modal isOpen={deleteIsOpen}>
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

export default FormCrud