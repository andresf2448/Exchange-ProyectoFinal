// import { checkTomlForFields } from "../methodsWallet/checkTomlForFields";
import auth from "./useAuth";
import { checkInfo } from "../methodsWallet/checkInfo";
// import { createPopup } from "../methodsWallet/createPopup";
import { interactiveDepositFlow } from "../methodsWallet/interactiveDepositFlow";
// import { pollDepositUntilComplete } from "../methodsWallet/pollDepositUntilComplete";
import StellarSdk from "stellar-sdk";


/* import { FormatListNumberedTwoTone } from "@material-ui/icons"; */
var bandera = true

 function depositHook({
  assetCode,
  assetIssuer,
  homeDomain,
  publicKey,
  secretKey,
  setResponseHook
}) {
   
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
      
      return { result, tomlResponse };
    })
    .then(async ({ result, tomlResponse }) => {
      // Check info
      const check = await checkInfo({
        type: "deposit",
        toml: result,
        assetCode,
      });
      
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
      
      return { token, tomlResponse };
    })
    .then(async({ token, tomlResponse }) => {
     
      const interactiveResponse = await interactiveDepositFlow({
        assetCode,
        publicKey,
        sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
        token,
        claimableBalanceSupported: true,
      })
      
      setResponseHook(() => {return { interactiveResponse, token }})
      
      return{ interactiveResponse, token } ;
    })

    // .then(({ interactiveResponse, token }) => {
      // console.log('este es el interactive response antes de entrar al popup', interactiveResponse)
      // const popup = createPopup(interactiveResponse);
      // return interactiveResponse
    
      // const { currentStatus } = pollDepositUntilComplete({
      //   popup,
      //   transactionId: interactiveResponse.id,
      //   token,
      //   sep24TransferServerUrl: homeDomain,
      // });

    // });

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

  // return {
    /* currentStatus, */
  // };
  
}
}

export default depositHook;
