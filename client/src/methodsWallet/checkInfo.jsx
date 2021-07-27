
import axios from "axios";

export const checkInfo = async ({ type, toml, assetCode }) => {
  console.log('entro a checkInfo', toml.TRANSFER_SERVER_SEP0024)

  const infoURL = `${toml.TRANSFER_SERVER_SEP0024}/info`;
  console.log('este es el URL para la ruta de info', infoURL )

  const info = await axios.get(infoURL);
  console.log(info)
  if (!info.data[type][assetCode].enabled === true) {
    throw new Error("Asset is not enabled in the `/info` endpoint");
  }

  return info.data;
};
