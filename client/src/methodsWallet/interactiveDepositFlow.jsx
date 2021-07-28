import axios from 'axios'
export const interactiveDepositFlow = async ({
  assetCode,
  publicKey,
  sep24TransferServerUrl,
  
  claimableBalanceSupported,
}) => {
 
  const response = await axios.post(
    `${sep24TransferServerUrl}/deposit/interactive`,
    {
        asset_code: assetCode,
        account: publicKey,
        lang: "en",
        claimable_balance_supported: claimableBalanceSupported,
      
      headers: {
        
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
