import { useState } from "react";
import { supabase } from "supabase/supabase";

export default function InitDeposit() {
  const [assets, setAssets] = useState();
  const [asset, setAsset] = useState();

  async function getAssets() {
    const { data: assets } = await supabase.from("assets").select("*");
    return setAssets(assets);
  }
  if (!assets) getAssets();
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
