import { checkTomlForFields } from "./checkTomlForFields";
import { useAuth } from "customHooks/useAuth";


async function deposit() {
  // Check toml
  const tomlResponse = checkTomlForFields({
    /*  assetIssuer,
    requiredKeys: [
      TomlFields.SIGNING_KEY,
      TomlFields.TRANSFER_SERVER_SEP0024,
      TomlFields.WEB_AUTH_ENDPOINT,
    ],
    networkUrl: networkConfig.url,
    homeDomain, */
  });

// Check info
await checkInfo({
  type: AnchorActionType.DEPOSIT,
  toml: tomlResponse,
  assetCode,
});


//autenticacion
 const params = { 
  authEndpoint,
  serverPublicKey,
  publicKey,
  secretKey
 }
const token = useAuth(params)




}
