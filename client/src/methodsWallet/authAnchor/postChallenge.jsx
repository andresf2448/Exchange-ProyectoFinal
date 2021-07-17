import axios from "axios";

export const send = async ({ authEndpoint, signedChallengeTransaction }) => {
  const params = {
    transaction: signedChallengeTransaction.toEnvelope().toXDR("base64"),
  };

  const urlParams = new URLSearchParams(params);
  const result = await axios(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlParams.toString(),
  });

  if (!result.token) {
    throw new Error("No token returned from `/auth`");
  }

  return result.token;
};
