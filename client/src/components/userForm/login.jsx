import React from 'react'
import { useForm } from 'react-hook-form';
import {FormGroup, Form, Button, Label, Input} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getLogin } from '../../redux/users';

const Login =() =>{

    const dispatch = useDispatch();


  const {register, errors, handleSubmit} = useForm();

  const onSubmit = (data, e) =>{
    dispatch(getLogin(data));
    e.target.reset();

  }

    
    return(

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Email</Label>
            <input 
              placeholder="ejemplo@email.com"
              name="email"
              className="form-control"
              ref={register({
                required:"Email es requerido.",
                pattern:{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Favor ingresar email ejemplo@email.com'
                }
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.email?.message}
            </span>
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <input 
              placeholder="Contraseña"
              name="password"
              type='password'
              className="form-control"
              ref={register({
                required:{
                  value:true,
                  message:'Contraseña es requerida.'
                }
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.password?.message}
            </span>
          </FormGroup>
          
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </Form>
    )
}

export default Login