import { useState } from "react";
import depositHook from "../../customHooks/depositHook";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { useEffect } from "react";

export default function DepositWallet() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [transaction, setTransaction] = useState(true);
  const [responseHook, setResponseHook] = useState()
  
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
  getKeys();
  const assetCode = "ARSR";
  const assetIssuer =
    "GCHMQERSYAEIXDGRQLZZPXOLCZZLN535HWYC6ARIGSKZ2DKV4YQHJ6AB";

  const homeDomain = "rocketxchangeapi.herokuapp.com";
  
 useEffect(() => {
    async function callHook() {
      if (transaction && publicKey && secretKey) {
        setTransaction(false);
        // return depositHook({ publicKey, secretKey, assetIssuer, assetCode, homeDomain })
        depositHook({ publicKey, secretKey, assetIssuer, assetCode, homeDomain, setResponseHook })
        
        
      }
    }
    callHook()
 }, [publicKey, secretKey, transaction,responseHook])

//  if (responseHook) {
//    setLinkToken({
//      link: responseHook.interactiveResponse.url,
//      token: responseHook.token
//    })
//    const {interactiveResponse, token} = responseHook
//    const {url} = interactiveResponse
//  }
  return (
    <div>
      {/* <div>
        <div>CRIPTO</div> */}
        {responseHook ? <Link to={`${responseHook.interactiveResponse.url}`} target='_blank'>Click Here to Pay</Link> : null}
        {/* <buttom>Deposit Crypto</buttom>
      </div>
      <div>
        <div>FIAT</div>
        <div>Deposit Fiat</div>
      </div>
      <div>
        <div>STELLAR LUMENS (XLM)</div>
        <div>Buy whith credit card</div>
      </div> */}
    </div>
  );
}
