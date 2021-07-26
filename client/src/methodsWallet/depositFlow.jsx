

export function deposit(){

     // Check toml
     const tomlResponse = checkTomlForFields({
        sepName: "SEP-24 deposit",
        assetIssuer,
        requiredKeys: [
          TomlFields.SIGNING_KEY,
          TomlFields.TRANSFER_SERVER_SEP0024,
          TomlFields.WEB_AUTH_ENDPOINT,
        ],
        networkUrl: networkConfig.url,
        homeDomain,
      });
}