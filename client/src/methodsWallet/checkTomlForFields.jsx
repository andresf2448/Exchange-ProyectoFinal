import { getHomeDomain } from "./getHomeDomain";
import { getToml } from "./getToml";
import StellarSdk from 'stellar-sdk';

export const checkTomlForFields = async ({
  assetIssuer,
  requiredKeys,
  networkUrl,
  homeDomain,

  toml
}) => {
  if (!homeDomain) {
    homeDomain = await getHomeDomain({
      assetIssuer,
      networkUrl,
    });
  }
  console.log("llego hasta antes del pedido del toml");

  /* getToml(homeDomain) */
  
 /* StellarSdk.StellarTomlResolver.resolve(homeDomain, {
    allowHttp: true,
  }).then((tomlResponse) => {

    console.log("paso el pedido del toml", tomlResponse) */

    const result = requiredKeys.reduce((res, key) => {
      if (toml[key]) {
        return { ...res, [key]: toml[key].replace(/\/$/, "") };
      }
      return res;
    }, {});
    console.log(result)
    return result;
  
};
