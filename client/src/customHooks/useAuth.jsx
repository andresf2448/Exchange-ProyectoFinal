import { Utils } from "stellar-sdk";
import {
  readChallenge,
  signChallenge,
  sendChallenge,
} from "./functionsAuthentication";

export default async function useAuth({
  authEndpoint,
  serverPublicKey,
  publicKey,
  secretKey,
}) {
  try {
    const tx = await readChallenge({
      authEndpoint,
      serverPublicKey,
      publicKey,
    });

    const transaction = await signChallenge({ tx, secretKey });

    let token;
    if (Utils.verifyTxSignedBy(transaction, publicKey))
      token = await sendChallenge({ authEndpoint, transaction });

    return token;
  } catch (error) {
    return error;
  }
}
