import React from "react";
import { useForm } from "react-hook-form";


export default function UserForm() {
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting }
      } = useForm();
      const onSubmit = data => {
        alert(JSON.stringify(data));
      };
     
    
      return (
        <form className="App" onSubmit={handleSubmit(onSubmit)}>
          <h5>Crea tu cuenta de usuario completando el siguiente formulario:</h5>
          <label>Nombre de Usuario</label>
          <input
            name="username"
            ref={register({ minLength: 3, required: true})}
          />
          
    
          <label>Email</label>
          <input
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
         

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6 })}
          />
          
    
          <input disabled={isSubmitting} type="submit" />
        </form>
  );
}

