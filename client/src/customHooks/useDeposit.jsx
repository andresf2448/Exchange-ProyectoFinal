import { checkTomlForFields } from "../methodsWallet/checkTomlForFields";
import auth from "../customHooks/useAuth";
import { checkInfo } from "../methodsWallet/checkInfo";
import { createPopup } from "../methodsWallet/createPopup";
import { interactiveDepositFlow } from "../methodsWallet/interactiveDepositFlow";
import { pollDepositUntilComplete } from "../methodsWallet/pollDepositUntilComplete";
import StellarSdk from "stellar-sdk";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

async function useDeposit({
  assetCode,
  assetIssuer,
  homeDomain,
  publicKey,
  secretKey,
}) {
  console.log(publicKey)
  StellarSdk.StellarTomlResolver.resolve(homeDomain, {
    allowHttp: true,
  })
    .then((tomlResponse) => {
      console.log("aaaaaaaaaaaaaaaaaaa", tomlResponse);
      return tomlResponse;
    })
    .then((tomlResponse) => {
      let requiredKeys = [
        "SIGNING_KEY",
        "TRANSFER_SERVER_SEP0024",
        "AUTH_SERVER",
      ];

      const result = requiredKeys.reduce((res, key) => {
        if (tomlResponse[key]) {
          return { ...res, [key]: tomlResponse[key].replace(/\/$/, "") };
        }
        return res;
      }, {});
      console.log(result);
      return {result, tomlResponse};
    }).then(({result, tomlResponse}) => {

      // Check info
      const check = checkInfo({
        type: "deposit",
        toml: result,
        assetCode,
      });
      console.log('este es el checkinfo', check)
      if(check) return tomlResponse;
      return 'Divisa no encontrada en endpoint info'
    }).then((tomlResponse) => {
      const params = {
        authEndpoint: tomlResponse.AUTH_SERVER,
        serverPublicKey: tomlResponse.SIGNING_KEY,
        publicKey,
        secretKey,
      }
      const token = auth(params);
      console.log(token)
      return token
    })





  // Check toml
  /* const tomlResponse = checkTomlForFields({
    assetIssuer,
    requiredKeys: [
      "SIGNING_KEY",
      "TRANSFER_SERVER_SEP0024",
      "AUTH_SERVER",
    ],
    networkUrl:"https://horizon-testnet.stellar.org",
    homeDomain,
    toml
  }).then((tomlResponse) => {

    // Check info
    const check = checkInfo({
      type: "deposit",
      toml: tomlResponse,
      assetCode,
    });
    console.log('este es el checkinfo', check)
    console.log('este es el toml', tomlResponse)

  }) */

  //autenticacion
  /* const params = {
    authEndpoint: tomlResponse.WEB_AUTH_ENDPOINT,
    serverPublicKey: tomlResponse.SIGNING_KEY,
    publicKey,
    secretKey,
  }; */
  /* const token = useAuth(params);
  console.log(token); */

  // Interactive flow
 /*  const interactiveResponse = await interactiveDepositFlow({
    assetCode,
    publicKey,
    sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
    token,
    claimableBalanceSupported: true,
  });
  console.log("este es el interactiveResponse", interactiveResponse); */
  // CPopup
  /* const popup = createPopup(interactiveResponse.url); */
  // Poll transaction until complete
  /* const { currentStatus } = await pollDepositUntilComplete({
    popup,
    transactionId: interactiveResponse.id,
    token,
    sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
  }); */

  return {
    /* currentStatus, */
  };
}

export default useDeposit;
