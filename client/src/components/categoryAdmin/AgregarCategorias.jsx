import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import axios from 'axios';

import './AgregarCategorias.css'


const url ='http://localhost:3001/category/';

const AgregarCategorias = ({newCat,categories,getCat}) =>{

    const [visible, setVisible] = useState(false);
    const [categorie,setCategorie] = useState({
        name:'',
        description:''
    });
    const [successPost, setSuccessPost] = useState()

    const postCategorie = async() =>{
        await axios.post(url, categorie)
        .then(res=>{
            setSuccessPost(true)
            setVisible(true);           
        })
        .catch((e) => {
            setSuccessPost(false);
            setVisible(true);             
        })
        newCat()
    }

    const handleInputChange =(e)=>{//toma el value del input
        setCategorie({
            ...categorie,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeDelete = async(e) => {
        await axios.delete(`http://localhost:3001/category/${e}`)
        getCat()
    }

    const handleSave = async()=> {
        await axios.put(`http://localhost:3001/category/${categorie.id}`,categorie)
        getCat()
    }

    const hangleChangeEdit = (e) => {
        setCategorie(e)
    }


    const onSubmit = (e)=>{ //las acciones para agregar producto o actualizar.
        e.preventDefault();
        setCategorie({
            name:'',
            description:''
        })
    }

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
                        ¡Categoría agregada!
                        </Alert> :
                        <Alert className= 'alert' color="danger" isOpen={visible} toggle={onDismiss} >
                        Por favor complete todos los campos.
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