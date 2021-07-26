import { useState, useEffect } from "react";
import { getAssets } from "redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import StellarSdk from "stellar-sdk";

export default function InitDeposit() {
  const assets = useSelector((store) => store.assets);
  const [asset, setAsset] = useState();
  const dispatch = useDispatch();

  StellarSdk.StellarTomlResolver.resolve("localhost:3001", { allowHttp: true })
    .then((stellarToml) => {
      console.log("este es el toml", stellarToml);
    })
    .catch((error) => {
      console.log("toml invalido", error);
    });
  const aux = window.location.hash;
  const type = aux.slice(1);

  /* if (assets.length === 0) dispatch(getAssets()); */
  /* useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!assets) getAssets(); */

  const selectAsset = (event) => {
    const asset = assets.filter(
      (element) => element.asset_code === event.target.value
    );
    return setAsset(asset[0]);
  };

  return (
    <>
      {!asset && (
        <div>
          <div>WHAT {type} TOKEN WOULD YOU LIKE TO DEPOSIT?</div>
          <select
            defaultValue=""
            name="asset"
            onChange={(event) => selectAsset(event)}
          >
            <option>Select a bid Asset</option>
            {assets &&
              assets.map((element) => {
                return (
                  <option
                    onChange={(event) => selectAsset(event)}
                    key={element.asset_code}
                  >
                    {element.asset_code}
                  </option>
                );
              })}
          </select>{" "}
        </div>
      )}

      {
        <div>
          <div>DEPOSIT</div>
          <div>{asset?.asset_code}</div>
          <div>{asset?.home_domain}</div>
          <div>START THE TRANSFER </div>
          <div>
            Additional information required to start the transfer process. Click
            the ‘Continue’ button to proceed with the interactive portion of the
            flow in a new window.
          </div>
          <div>
            Having issues with your transaction? Contact anchor support at{" "}
            {asset?.home_domain}
          </div>
        </div>
      }
      <bottom>BACK</bottom>
      <bottom>CONTINUE</bottom>
    </>
  );
}
