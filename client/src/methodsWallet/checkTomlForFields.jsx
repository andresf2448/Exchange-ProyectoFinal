import { getHomeDomain } from "./getHomeDomain";

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
  

    const result = requiredKeys.reduce((res, key) => {
      if (toml[key]) {
        return { ...res, [key]: toml[key].replace(/\/$/, "") };
      }
      return res;
    }, {});
    
    return result;
  
};
