import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AgregarCategorias = ({newCat}) =>{
    
    const [input,setInput] = useState({
        name: "",
        description:""
    })
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Crear categoria</h3>
                <div className="form-group">
                    <label>Categoria:</label><br />
                    <input  name='name' type='text' value={input.name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Descripcion:</label><br />
                    <textarea name='description' onChange={handleChange} value={input.description}/>
                </div>
                <button class="btn btn-primary" type='submit' onClick={()=> newCat(input)}>Crear categoria</button>
            </form>

            
        </div>
    )
}

export default AgregarCategorias