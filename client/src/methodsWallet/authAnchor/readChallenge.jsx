import { Utils } from "stellar-sdk";
import axios from "axios";

const startChallenge = async ({
  authEndpoint,
  serverSigningKey,
  publicKey,
  homeDomain,
}) => {
  const params = { account: publicKey, homeDomain };

  const authURL = new URL(authEndpoint);

  Object.entries(params).forEach(([key, value]) => {
    authURL.searchParams.append(key, value);
  });

  const result = await axios.get(authURL.toString());

  if (!result.transaction) {
    throw new Error("The response didn’t contain a transaction");
  }

  const { tx } = Utils.readChallengeTx(
    result.transaction,
    serverSigningKey,
    result.network_passphrase,
    homeDomain,
    authURL.host
  );

  return tx;
};

export default startChallenge;
