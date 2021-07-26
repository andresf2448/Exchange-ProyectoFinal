import { useState } from "react";
import { useDeposit } from "customHooks/useDeposit";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabase";

export default function Deposit() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const session = supabase.auth.session();

  async function getKeys() {
    let { data: publicKey } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    let { data: secretKey } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    setPublicKey(publicKey[0].public_key);
    return setSecretKey(secretKey[0].secret_key);
  }
  
  if(!publicKey && !secretKey) getKeys()


  useDeposit({publicKey, secretKey});
  return (
    <div>
      <div>
        <div>CRIPTO</div>
        <Link
          to={{
            pathname: "/deposit",
            hash: "#crypto",
          }}
        />
        <buttom>Deposit Crypto</buttom>
      </div>
      <div>
        <div>FIAT</div>
        <div>Deposit Fiat</div>
      </div>
      <div>
        <div>STELLAR LUMENS (XLM)</div>
        <div>Buy whith credit card</div>
      </div>
    </div>
  );
}
