import React,{useState} from 'react'
import axios from 'axios'
import {FormGroup, Form, Button, Label, Input, UncontrolledAlert} from 'reactstrap';

const RecuperarPass = ({id}) =>{
    
    const [input,setInput] = useState({
        email:"",
        newPassword:"",
        password:""
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const recuperarPass = async() => {
        console.log(input)
        await axios.post(`http://localhost:3001/user/resetPass`,input)
    }

    const newPass = async() => {
        await axios.put(`http://localhost:3001/user/resetPass/${id}`,input)
    }
    console.log('input',input)
    
    let condition = (input.newPassword === input.password)

    return(
        <Form>
        <FormGroup>
        <div className="m-4">
            <h3>Recuperación de usuario o Contraseña</h3>
            {!id ? 
            <div>
                <Label>Email</Label>
                <input 
                id='login-input'
                placeholder="Ingrese su email"
                name="email"
                className="form-control mb-4"
                onChange={handleChange}
                />
            </div>
            :
            <div>
                <Label>Nueva Contraseña</Label>
                <input 
                id='login-input'
                name="newPassword"
                type='password'
                className="form-control col-4 mb-4"
                onChange={handleChange}
                />
                <Label>Confirmar Contraseña</Label>
                <input 
                id='login-input'
                name="password"
                type='password'
                className="form-control col-4 mb-4"
                onChange={handleChange}
                />
                {(input.password && !condition) && <span style={{fontSize:'small',color:'red'}}>Las contraseñas no coinciden</span>}
            </div>}
            {!id ? <Button onClick={recuperarPass}>Enviar</Button>
            :
            <Button onClick={newPass} disabled={(input.password && condition) ? false : true}>
                Cambiar contraseña
            </Button>}
        </div>
        </FormGroup>
    
    </Form>
    )
}

export default RecuperarPass;