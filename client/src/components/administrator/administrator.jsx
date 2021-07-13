import React from "react";
import { useHistory } from "react-router";

export function Administrador() {
  const history = useHistory();

  let adminUsers = () => {
    history.push("/adminitratorUsers");
  };

  return (
    <div>
      <h4>Bienvenido Admin</h4>
      <button type="button" onClick={adminUsers}>
        Usuarios
      </button>
    </div>
  );
}