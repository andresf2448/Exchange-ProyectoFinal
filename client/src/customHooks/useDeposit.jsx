import { checkTomlForFields } from "../methodsWallet/checkTomlForFields";
import auth from "./useAuth";
import { checkInfo } from "../methodsWallet/checkInfo";
import { createPopup } from "../methodsWallet/createPopup";
import { interactiveDepositFlow } from "../methodsWallet/interactiveDepositFlow";
import { pollDepositUntilComplete } from "../methodsWallet/pollDepositUntilComplete";
import StellarSdk from "stellar-sdk";
/* import { FormatListNumberedTwoTone } from "@material-ui/icons"; */
var bandera = true

 function useDeposit({
  assetCode,
  assetIssuer,
  homeDomain,
  publicKey,
  secretKey,
}) {
   
  
  
  console.log('esta es la publickey',publicKey);

  if(bandera) {
    bandera = false
    StellarSdk.StellarTomlResolver.resolve(homeDomain, {
    allowHttp: true,
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
      return { result, tomlResponse };
    })
    .then(async ({ result, tomlResponse }) => {
      // Check info
      const check = await checkInfo({
        type: "deposit",
        toml: result,
        assetCode,
      });
      console.log("este es el checkinfo", check);
      if (check) return tomlResponse;
      return "Divisa no encontrada en endpoint info";
    })
    .then(async (tomlResponse) => {
      const params = {
        authEndpoint: tomlResponse.AUTH_SERVER,
        serverPublicKey: assetIssuer,
        publicKey,
        secretKey,
      };
      const token = await auth(params);
      console.log("este es el token", token);
      return { token, tomlResponse };
    })
    .then(async({ token, tomlResponse }) => {
      console.log(
        "estos son los parametros a interactive deposit",
        publicKey,
        assetCode
      );
      const interactiveResponse = await interactiveDepositFlow({
        assetCode,
        publicKey,
        sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
        token,
        claimableBalanceSupported: true,
      })
      
      return{ interactiveResponse, token } ;
    })
    .then(({ interactiveResponse, token }) => {
      console.log('este es el interactive response antes de entrar al popup', interactiveResponse)
      const popup = createPopup(interactiveResponse);
    
      const { currentStatus } = pollDepositUntilComplete({
        popup,
        transactionId: interactiveResponse.id,
        token,
        sep24TransferServerUrl: homeDomain,
      });

    });

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
}

export default useDeposit;
