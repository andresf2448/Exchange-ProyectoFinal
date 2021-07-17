import { useState } from "react";
import {
  readChallenge,
  signChallenge,
  postChallenge,
} from "./functionsAuthentication";


export default async function useAuth({
  authEndpoint,
  serverPublicKey,  
  publicKey,
  secretKey,
}) {
  const [error, setError] = useState();

  

  readChallenge({ authEndpoint, serverPublicKey, publicKey });


  signChallenge({})

  postChallenge({})

  return token;
}
