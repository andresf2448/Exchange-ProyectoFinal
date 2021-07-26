import { checkTomlForFields } from "../methodsWallet/checkTomlForFields";
import { useAuth } from "customHooks/useAuth";
import { checkInfo } from "../methodsWallet/checkInfo";
import { createPopup } from "../methodsWallet/createPopup";
import { interactiveDepositFlow } from "../methodsWallet/interactiveDepositFlow";
import { pollDepositUntilComplete } from "../methodsWallet/pollDepositUntilComplete";

async function useDeposit({
  assetCode,
  assetIssuer,
  homeDomain,
  publicKey,
  secretKey,
}) {
  // Check toml
  const tomlResponse = checkTomlForFields({
    assetIssuer,
    requiredKeys: [
      "SIGNING_KEY",
      "TRANSFER_SERVER_SEP0024",
      "WEB_AUTH_ENDPOINT",
    ],
    networkUrl:"https://horizon-testnet.stellar.org",
    homeDomain,
  });

  // Check info
  await checkInfo({
    type: "deposit",
    toml: tomlResponse,
    assetCode,
  });

  //autenticacion
  const params = {
    authEndpoint: tomlResponse.WEB_AUTH_ENDPOINT,
    serverPublicKey: tomlResponse.SIGNING_KEY,
    publicKey,
    secretKey,
  };
  const token = useAuth(params);
  console.log(token)

  // Interactive flow
  const interactiveResponse = await interactiveDepositFlow({
    assetCode,
    publicKey,
    sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
    token,
    claimableBalanceSupported: true,
  });

  // CPopup
  const popup = createPopup(interactiveResponse.url);
  // Poll transaction until complete
  const { currentStatus } = await pollDepositUntilComplete({
    popup,
    transactionId: interactiveResponse.id,
    token,
    sep24TransferServerUrl: tomlResponse.TRANSFER_SERVER_SEP0024,
  });
  return {
    currentStatus,
  };
}

export default useDeposit;
