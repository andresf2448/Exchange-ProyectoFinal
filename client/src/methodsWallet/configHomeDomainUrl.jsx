


export const configHomeDomainUrl = (homeDomain)  => {
  
  if (homeDomain.includes("localhost")) {
    homeDomain = homeDomain.startsWith("http")
      ? homeDomain
      : `http://${homeDomain}`;
  } else {
    homeDomain = homeDomain.startsWith("http")
      ? homeDomain
      : `https://${homeDomain}`;
  }

  return new URL(homeDomain.replace(/\/$/, ""));
};