import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>Este campo es requerido.</p>;
      case "minLength":
        return <p>La contraseña debe tener al menos 6 caracteres.</p>;
      case "pattern":
        return <p>Este email no es válido.</p>;
      default:
        return null;
    }
  }

  return null;
}
