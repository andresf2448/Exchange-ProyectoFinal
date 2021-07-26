import { get } from "lodash";
import axios from "axios";

export const checkInfo = async ({ type, toml, assetCode }) => {
  const infoURL = `${toml.TRANSFER_SERVER_SEP0024}/info`;

  const info = await axios.get(infoURL);

  if (!get(info.data, [type, assetCode, "enabled"])) {
    throw new Error("Asset is not enabled in the `/info` endpoint");
  }

  return info.data;
};
