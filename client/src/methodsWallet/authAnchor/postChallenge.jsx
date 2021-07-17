import axios from "axios";

export const send = async ({ authEndpoint, signedChallengeTransaction }) => {
  const params = {
    transaction: signedChallengeTransaction.toEnvelope().toXDR("base64"),
  };

  const urlParams = new URLSearchParams(params);

  const result = await axios({
    method: "POST",
    url: authEndpoint,
    data: urlParams.toString(),
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  if (!result.token) {
    throw new Error("No token returned from `/auth`");
  }

  return result.token;
};
