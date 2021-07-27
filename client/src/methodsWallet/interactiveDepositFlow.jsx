import { each } from "lodash";
import axios from 'axios'
export const interactiveDepositFlow = async ({
  assetCode,
  publicKey,
  sep24TransferServerUrl,
  token,
  claimableBalanceSupported,
}) => {
 /*  const formData = new FormData();
  const postDepositParams = {
    asset_code: assetCode,
    account: publicKey,
    lang: "en",
    claimable_balance_supported: claimableBalanceSupported,
  };
 */
  /* each(postDepositParams, (value, key) => formData.append(key, value)); */
  /* console.log('este es postparams', postDepositParams) */
console.log('llego hasta antes del pedido al back para empezar el deposito',assetCode, publicKey)
  const response = await axios.post(
    `${sep24TransferServerUrl}/deposit/interactive`,
    {
      
      
        asset_code: assetCode,
        account: publicKey,
        lang: "en",
        claimable_balance_supported: claimableBalanceSupported,
      
      headers: {
        /* Authorization: `Bearer ${token}` */
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*"
      
    }}
  );
  console.log('paso el pedido del back para crear el deposito')

  const interactiveJson = await response.data;

  if (!interactiveJson.url) {
    throw new Error(
      "No URL returned from POST `/transactions/deposit/interactive`"
    );
  }

  return interactiveJson;
};
