import auth from "./useAuth";
import { checkInfo } from "../methodsWallet/checkInfo";
import { interactiveDepositFlow } from "../methodsWallet/interactiveDepositFlow";
import StellarSdk from "stellar-sdk";

var flag = true

 function depositHook({
  assetCode,
  assetIssuer,
  homeDomain,
  publicKey,
  secretKey,
  setResponseHook
}) {
   
  if(flag) {
    flag = false
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
      console.log('ResponseHook')
      setResponseHook(() => {return { interactiveResponse, token }})
      flag = true
      return{ interactiveResponse, token } ;
    })
  
}
}

export default depositHook;
