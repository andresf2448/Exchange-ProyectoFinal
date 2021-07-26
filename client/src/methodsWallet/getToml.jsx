import { StellarTomlResolver } from "stellar-sdk";
import { configHomeDomainHttp } from "./configHomeDomainHttp";

export const getToml = async (homeDomain) => {
  const tomlURL = configHomeDomainHttp(homeDomain);
  tomlURL.pathname = "/.well-known/stellar.toml";

  const tomlResponse =
    tomlURL.protocol === "http:"
      ? await StellarTomlResolver.resolve(tomlURL.host, {
          allowHttp: true,
        })
      : await StellarTomlResolver.resolve(tomlURL.host);

  return tomlResponse;
};