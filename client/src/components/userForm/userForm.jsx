import React from "react";
import ErrorMessage from "./errorMessage";
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
          <ErrorMessage error={errors.username} />
    
          <label>Email</label>
          <input
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          <ErrorMessage error={errors.email} />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6 })}
          />
          <ErrorMessage error={errors.password} />
    
          <input disabled={isSubmitting} type="submit" />
        </form>
  );
}

