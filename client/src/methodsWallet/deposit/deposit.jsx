import { useState } from "react";
import  deposit  from "../../customHooks/useDeposit";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

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
  getKeys() 
  const assetCode = 'ARSR';
  const assetIssuer = 'GCHMQERSYAEIXDGRQLZZPXOLCZZLN535HWYC6ARIGSKZ2DKV4YQHJ6AB'
  

   const homeDomain = "localhost:3001" 
   console.log('holaaa')
   if(publicKey && secretKey) deposit({publicKey, secretKey, assetIssuer, assetCode, homeDomain});
   
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
