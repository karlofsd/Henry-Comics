import React, { useState } from 'react'
import axios from 'axios'
import { Button, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import './recuperarPass.css'

const RecuperarPass = ({ id }) => {

    const [input, setInput] = useState({
        email: "",
        newPassword: "",
        password: ""
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const recuperarPass = async () => {
        console.log(input)
        await axios.post(`http://localhost:3001/user/resetPass`, input)
        alert('Correo Enviado')
    }

    const newPass = async () => {
        await axios.put(`http://localhost:3001/user/resetPass/${id}`, input)
            alert('Contraseña actualizada ')
    }
    console.log('input', input)

    let condition = (input.newPassword === input.password)

    return (
        <div className='cont-use-contra'>
            <Toast>
                <h5 className='m-3'>Recuperación de usuario o contraseña </h5>
                <hr />
                {!id ?
                    <div>
                        <ToastBody>
                            <Label className='m-3'>Email</Label>
                        </ToastBody>
                        <input
                            id='login-input'
                            placeholder="Ingrese su email"
                            name="email"
                            className="form-control col-4 m-3"
                            onChange={handleChange}
                        />
                    </div>
                    :
                    <div>
                        <Label className='m-3 '>Nueva Contraseña</Label>
                        <input
                            id='login-input'
                            name="newPassword"
                            type='password'
                            className="form-control col-4 ml-3"
                            onChange={handleChange}
                        />
                        <Label className='m-3'>Confirmar Contraseña</Label>
                        <input
                            id='login-input'
                            name="password"
                            type='password'
                            className="form-control col-4 ml-3"
                            onChange={handleChange}
                        />
                        {(input.password && !condition) && <span className='ml-3' style={{ fontSize: 'small', color: 'red' }}>Las contraseñas no coinciden</span>}
                    </div>}
                <ToastBody>
                    {!id ? <Button onClick={recuperarPass}>Enviar</Button>
                        :
                        <Button onClick={newPass} disabled={(input.password && condition) ? false : true}>
                            Cambiar contraseña
            </Button>}
                </ToastBody>
            </Toast>
        </div>
    )
}

export default RecuperarPass;