import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AgregarCategorias = () =>{
    return(
        <div>
            <form>
                <h3>Crear categoria</h3>
                <div className="form-group">
                    <label>Categoria:</label><br />
                    <input  type='text' />
                </div>
                <div className="form-group">
                    <label>Descripcion:</label><br />
                    <textarea />
                </div>
                <button class="btn btn-primary" type='submit'>Crear categoria</button>
            </form>

            
        </div>
    )
}

export default AgregarCategorias