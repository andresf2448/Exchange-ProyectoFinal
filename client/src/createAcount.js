import React, { useState } from "react";
import axios from "axios";
import { supabase } from "Supabase/Supabase";

export default function CreateAccount() {
  const [user, setUser] = useState(false);
  const [keyword, setKeyword] = useState();
  const session = supabase.auth.session();

  async function crearCuenta() {
    const response = await axios.get("http://localhost:3001/createWallet");
    console.log(response.data);
    const { data, error } = await supabase.from("keywords").insert([
      {
        publicKey: response.data[0].publicKey,
        secretKey: response.data[0].secretKey,
        userId: session.user.id,
      },
    ]);
    if (error) throw new Error("wallet no encontrada");
    if (data) {
      setUser(true);
      return setKeyword(data);
    }
  }

  return (
    <div>
      {keyword && (
        <div>
          <div>Esta es su publicKey: {keyword.publicKey}</div>
          <div>Esta es su secretKey: {keyword.secretKey}</div>
        </div>
      )}
      {!user && <button onClick={() => crearCuenta()}>Crear Cuenta</button>}
    </div>
  );
}
