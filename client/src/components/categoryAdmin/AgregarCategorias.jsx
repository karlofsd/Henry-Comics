import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { getCategory } from '../../redux/categorias'
import './AgregarCategorias.css'

const url ='http://localhost:3001/category/';

const AgregarCategorias = ({/* newCat,categories,getCat */}) =>{
    
    const categories = useSelector( store => store.categoryState.categories)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getCategory())
    },[])

    // ------------ALERTS--------------------
    const [successPost, setSuccessPost] = useState()
    const [visible, setVisible] = useState(false);
    //-----------------------------------------------
    
    //-----------INPUT CHANGE------------------
    const [categorie,setCategorie] = useState({
        name:'',
        description:''
    });
    
    const handleInputChange =(e)=>{//toma el value del input
        setCategorie({
            ...categorie,
            [e.target.name] : e.target.value
        })
    }
    
    const hangleChangeEdit = (e) => { //SELECCIONA CATEGORIA
        setCategorie(e)  
    }
    //-----------------------------------------

    //------------CRUD----------------------
    const postCategorie = async() =>{ // ------------> CREAR CATEGORIA
        try{
            await axios.post(url, categorie)
            setSuccessPost(true)
            setVisible(true)
            dispatch(getCategory())          
        }
        catch(e){
            setSuccessPost(false);
            setVisible(true);             
        }
    }

    const handleChangeDelete = async(e) => { // --------> ELIMINAR CATEGORIA
        try{
            await axios.delete(`http://localhost:3001/category/${e}`)
            setSuccessPost(true)
            setVisible(true);        
        }
        catch(e){
            setSuccessPost(false);
            setVisible(true);            
        }
        dispatch(getCategory())
    }

    const handleSave = async()=> { // -------------> EDITAR CATEGORIA
        await axios.put(`http://localhost:3001/category/${categorie.id}`,categorie)
        dispatch(getCategory())
    }

    const onSubmit = (e)=>{ // DESPUES DE ENVIAR
        e.preventDefault();
        setCategorie({
            name:'',
            description:''
        })
    }
    //---------------------------------------------------------------------

    const onDismiss = () => setVisible(false);

    return(
        <div className='formCategories'>
            <div className='row justify-content-left'>
                <div className='col-sm-4 flex-start	'>
                    <form className= 'formCat'onSubmit={onSubmit}>
                        <h3>Crear Categoría</h3>
                        <p>Completa el formulario con la información necesaria para agregar una nueva categoría de producto.</p>
                        <div className="form-group">
                            <label>Nombre de la nueva categoría:</label><br />
                            <input className="border" type='text' name='name' onChange={handleInputChange} value={categorie.name} />
                        </div>
                        <div className="form-group">
                            <label>Descripción:</label><br />
                            <textarea className="border" name='description' onChange={handleInputChange} value={categorie.description}/>
                        </div>
                        <button class="btn btn-secondary" type='submit' onClick={postCategorie}>Crear nueva categoría</button>
                        {categorie.id && <button class="btn btn-primary" type='submit' onClick={() => handleSave()}>Guardar</button>}
                    </form>
                    {successPost ? 
                        <Alert className= 'alert' color="success" isOpen={visible} toggle={onDismiss} >
                        ¡Operacion exitosa!
                        </Alert> :
                        <Alert className= 'alert' color="danger" isOpen={visible} toggle={onDismiss} >
                        Error !!
                        </Alert>
                    }
                </div>
                <div className='col-lg w-100'>
                    <table className='table table-hover table-responsive w-100'>
                        <thead>
                            <tr>
                                <th className='th'>Id</th>
                                <th className='th'>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categories && categories.map(ele=>(
                            <tr>
                                <td className= 'table table-responsive'>{ele.id}</td>
                                <td className="w-50">{ele.name}</td>
                                <td className="w-50">
                                    <button className="btn btn-secondary btn-sm m-2 p-1" onClick={()=>{hangleChangeEdit(ele)}} >Editar</button>
                                  
                                    <button className="btn btn-dark btn-sm m-2 p-1" onClick={()=>{handleChangeDelete(ele.id)}}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                     
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
    )
}


export default AgregarCategorias