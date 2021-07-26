import { getHomeDomain } from "./getHomeDomain";
import { getToml } from ".createAccount/getToml";

export const checkTomlForFields = async ({
  assetIssuer,
  requiredKeys,
  networkUrl,
  homeDomain,
}) => {
  let homeDomainParam = homeDomain;

  if (!homeDomainParam) {
    homeDomainParam = await getHomeDomain({
      assetIssuer,
      networkUrl,
    });
  }

  const tomlResponse = await getToml(homeDomainParam);

  const result = requiredKeys.reduce((res, key) => {
    if (tomlResponse[key]) {
      return { ...res, [key]: tomlResponse[key].replace(/\/$/, "") };
    }

    return res;
  }, {});

  return result;
};
