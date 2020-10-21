import React from 'react'
import { useForm } from 'react-hook-form';
import {FormGroup, Form, Button, Label, Input} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../../redux/users';
import {localToUser} from '../../redux/carrito'


const Login =() =>{

    const dispatch = useDispatch();

  const {register, errors, handleSubmit} = useForm();
  const carrito =  useSelector(store => store.carritoState.carritoProducts);
  

  const onSubmit = async (arg, e) =>{
    
    try{
     await dispatch(getLogin(arg));
     await dispatch(localToUser(carrito))
      localStorage.removeItem('carrito');
      e.target.reset();

    }catch(err){
      console.log(err)
    }
    
  }

    
    return(

        <Form
        action="/login" 
        method="post" 
        onSubmit={handleSubmit(onSubmit)} 
        className="col-sm-6 order-sm-2 offset-sm-1 mt-5">
          <FormGroup>
            <Label>Nombre de usuario</Label>
            <input 
              placeholder="nombre de usuario"
              name="username"
              className="form-control col-4"
              ref={register({
                required:{
                  value:true,
                  message:"Usuario es requerido."}
                // pattern:{
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: 'Favor ingresar email ejemplo@email.com'
                // }
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
              className="form-control col-4"
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