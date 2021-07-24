import React from "react";
import { useHistory } from "react-router";

export const CardUser = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/home")}>volver</button>
    </div>
  );
};
