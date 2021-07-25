import { StellarTomlResolver } from "stellar-sdk";
import { getHomeDomainHttp } from "./configHomeDomainUrl";

export const getToml = async (homeDomain) => {
  const tomlURL = getHomeDomainHttp(homeDomain);
  tomlURL.pathname = "/.well-known/stellar.toml";

  const tomlResponse =
    tomlURL.protocol === "http:"
      ? await StellarTomlResolver.resolve(tomlURL.host, {
          allowHttp: true,
        })
      : await StellarTomlResolver.resolve(tomlURL.host);

  return tomlResponse;
};