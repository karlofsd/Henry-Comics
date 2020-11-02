import React,{useState} from 'react'
import axios from 'axios'
import {FormGroup, Form, Button, Label, Input, UncontrolledAlert} from 'reactstrap';
import {useHistory} from 'react-router-dom'

const RecuperarPass = ({id}) =>{
    const history = useHistory()
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
        alert('correo de recuperación enviado')
        setInput({
            ...input,
            email:""
        })
    }

    const newPass = async() => {
        await axios.put(`http://localhost:3001/user/resetPass/${id}`,input)
        alert('Se actualizó la contraseña, exitosamente.')
        history.push('/login')
    }
    console.log('input',input)
    
    let condition = (input.newPassword === input.password)
    const [verNewPass,setVerNewPass] = useState(false)
    const [verPass,setVerPass] = useState(false)

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
                value={input.email}
                onChange={handleChange}
                />
            </div>
            :
            <div>
                <Label>Nueva Contraseña</Label>
                <input 
                id='login-input'
                name="newPassword"
                type={verNewPass ? 'text':'password'}
                className="form-control col-4 mb-4"
                onChange={handleChange}
                style={{marginBottom:'0px'}}
                />
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <input type='checkbox' onChange={()=>setVerNewPass(!verNewPass)} style={{marginRight:'10px'}}/>
                    <label style={{margin:'0'}}>mostrar contraseña</label>
                </div>
                <Label>Confirmar Contraseña</Label>
                <input 
                id='login-input'
                name="password"
                type={verPass ? 'text':'password'}
                className="form-control col-4 mb-4"
                onChange={handleChange}
                style={{margin:'0px'}}
                />
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <input type='checkbox' onChange={()=>setVerPass(!verPass)} style={{marginRight:'10px'}}/>
                    <label style={{margin:'0'}}>mostrar contraseña</label>
                </div>
                {(input.password && !condition) && <span style={{fontSize:'small',color:'red'}}>Las contraseñas no coinciden</span>}
            </div>}
            {!id ? <Button onClick={recuperarPass} disabled={input.email? false : true}>Enviar</Button>
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