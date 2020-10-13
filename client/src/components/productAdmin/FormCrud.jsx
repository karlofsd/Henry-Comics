import React, {useState} from 'react';
import Select from "react-select";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader }from 'reactstrap';
import { Alert } from 'reactstrap';


const url = 'http://localhost:3001/products';


                
const FormCrud=({get, editCategory,editIsOpen,deleteIsOpen,tipoAccion, productGetApi, product, setProducto,categoria, idProduct,setProductGet, productGet,setInsertarProducto,setEliminarProducto})=>{
    
    let opcion =[];
    let opcionEliminar =[];

    const [selectedOption, setSelectedOption] = useState([]);
    const [visible, setVisible] = useState(false);
    const [successPost, setSuccessPost] = useState()
    const [selectedDelete, setSelectedDelete] = useState([]);

    const peticionPostProducto=async()=>{
        let body = {
            ...product,
            name: product.name.toLowerCase(),
            author: product.author.toLowerCase(),
            description: product.description.toLowerCase(),
            editorial: product.serie.toLowerCase()
        }
        await axios.post(`${url}/create`, body)
        .then(response=>{
            postCategoriProduct(response.data.newProduct.id);
            setSuccessPost(true);
            setVisible(true);
        })
        .catch((e) => {
        // setear para que avise que no se creó  
            setSuccessPost(false);
            setVisible(true);
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
        await selectedDelete.forEach(ele=>{
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
    if(editCategory.length>0){
        editCategory.forEach(e=>{opcionEliminar.push({ value: e.name, label: e.name, id:e.id })})
    }

    const uploadImage = async (e) => {

        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        // console.log(base64)
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
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e)=>{ //las acciones para agregar producto o actualizar.
        e.preventDefault();
        if(tipoAccion==='agregar'){
            peticionPostProducto();
            setProducto({});
        }else{
            peticionPut();
            postCategoriProduct(product.id);
            deleteCategoriProduc()
        }
        setInsertarProducto(false);
        get()
    }

    const select =(
        <Select
            isMulti
            name="categorias"
            options={opcion}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedOption}
        />
    );

    const onDismiss = () => setVisible(false);

    return(
        <div>
            
            <Modal isOpen={editIsOpen}>
                <ModalHeader>
                    <form className="form-group" onSubmit={onSubmit}>
                        <ModalBody>
                            <div><p>Completá los datos correspondientes al nuevo producto.</p></div>
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
                            <label>Agregar categoría:</label>
                            {select}
                            {tipoAccion !== 'agregar'&&
                                <div>
                                    <label>Eliminar categoría:</label>
                                        <Select
                                            isMulti
                                            name="categorias"
                                            options={opcionEliminar}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={setSelectedDelete}
                                        />
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>
                            {tipoAccion === 'agregar'?
                                <button className="btn btn-dark" type='submit'>Agregar</button>:
                                <button className="btn btn-secondary" type='submit'>Editar</button>   
                                }
                            <button type='button' className="btn btn-secondary" onClick={()=>setInsertarProducto(false)}>Cancelar</button>
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
            { successPost ?
                <Alert color="success" isOpen={visible} toggle={onDismiss} >
                    Producto Agregado Correctamente !!
                </Alert> :
                <Alert color="danger" isOpen={visible} toggle={onDismiss} >
                    Error!! Debe llenar todos los campos
                </Alert>
            }
        </div>
    )
}

export default FormCrud