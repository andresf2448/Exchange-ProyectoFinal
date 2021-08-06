import { StellarTomlResolver } from "stellar-sdk";
import { configHomeDomainHttp } from "./configHomeDomainHttp";

export const getToml = (homeDomain) => {
  const tomlURL = configHomeDomainHttp(homeDomain);
  tomlURL.pathname = "/.well-known/stellar.toml";
console.log('entra a get toml', tomlURL);
  
    if(tomlURL.protocol === "http:") { StellarTomlResolver.resolve(tomlURL.host, {
          allowHttp: true,
        }).then((response) => {
          console.log('entro a then de toml resolver', response)
          return response
        })}
     else  StellarTomlResolver.resolve(tomlURL.host).then((response) => {
       return response
     })

  /* return tomlResponse; */
};