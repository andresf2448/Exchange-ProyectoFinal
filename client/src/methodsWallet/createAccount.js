import React, { useState } from "react";
import axios from "axios";
import { supabase } from "supabase/supabase"; 

export default function CreateAccount() {
  const [data, setData] = useState();
  const [dataUser, setDataUser] = useState();
  const session = supabase.auth.session();

  async function crearCuenta() {
    const response = await axios.get("http://localhost:3001/createWallet");
    console.log(response.data);
    /* const { data, error } = await supabase.from("keywords").insert([
      {
        publicKey: response.data[0].publicKey,
        secretKey: response.data[0].secretKey,
        userId: session.user.id,
      },
    ]); */
    const infoDataUser = await supabase
        .from("datauser")
        .insert([
          {
            id_user: session.user.id,
            /* username, */
            email: session.email,
            public_key: response.data.publicKey,
            /* federation_Address: federation, */
          },
        ]);
      if(infoDataUser) setDataUser(infoDataUser)

    const { data, error }= await supabase
      .from("wallet")
      .insert([
        {
          id_user: session.user.id,
          /* wallet_number: wallet, */
          secret_key: response.data.secretKey,
        },
      ]);
      if(data) setData(data) 
      console.log('---------dataUser')
       console.log(dataUser)
       console.log('-------data')
       console.log(data)


      let info = await supabase
        .from('datauser')
        .select(`public_key`)
        .eq('id_user', session.user.id)
        .single()

    console.log('----------------')
     if(info) console.log(info)   
      /* console.log('---------infoDataUser----------')
      console.log(infoDataUser)
      console.log('---------data----------')
      console.log(data) */

    /* if (error) throw new Error("wallet no encontrada"); */
    /* if (data) {
      setUser(true);
      return setKeyword(data);
    } */
    
  }

  return (
    <div>
    
      {dataUser && (
        <div>
          <div>Esta es su publicKey: {dataUser.publicKey}</div>
        </div>
      )}
      {data && (
        <div>
          <div>Esta es su secretKey: {data.secretKey}</div>
        </div>
      )}
      {session && <button onClick={() => crearCuenta()}>Crear Cuenta</button>}
    </div>
  );
}
