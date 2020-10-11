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
            {successPost ? 
                <Alert className= 'alert' color="success" isOpen={visible} toggle={onDismiss} >
                    Categoría agregada!!
                </Alert> :
                <Alert className= 'alert' color="danger" isOpen={visible} toggle={onDismiss} >
                    Categoría no pudo ser creada, debe llenar todos los campos
                </Alert>
            }
            <form className= 'formCat'onSubmit={onSubmit}>
                <h3>Crear Categoría</h3>
                <div className="form-group">
                    <label>Categoría:</label><br />
                    <input  type='text' name='name' onChange={handleInputChange} value={categorie.name} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label><br />
                    <textarea name='description' onChange={handleInputChange} value={categorie.description}/>
                </div>
                <button class="btn btn-primary" type='submit' onClick={postCategorie}>Crear categoría</button>
                {categorie.id && <button class="btn btn-primary" type='submit' onClick={() => handleSave()}>Guardar</button>}
            </form>
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
                        {categories && categories.map(ele=>(
                            <tr>
                            <td>{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>
                            <button className="btn btn-primary" onClick={()=>{hangleChangeEdit(ele)}} >Editar</button>
                            <button className="btn btn-danger" onClick={()=>{handleChangeDelete(ele.id)}}>Eliminar</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AgregarCategorias