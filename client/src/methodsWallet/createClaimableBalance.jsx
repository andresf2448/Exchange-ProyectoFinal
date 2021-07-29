import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import { Select, MenuItem } from "@material-ui/core";

export default function CreateClaimableBalance({
  secretKey,
  publicKey,
  assets,
}) {
  const [balances, setBalances] = useState();
  const [userDestination, setUserDestination] = useState();
  const [asset, setAsset] = useState();
  const [amount, setAmount] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  useEffect(async () => {
    if (publicKey) {
      await server
        .claimableBalances()
        .sponsor(publicKey)
        .limit(1) // there may be many in general
        .order("desc") // so always get the latest one
        .call()
        .then((res) => setBalances(res.records))
        .catch(function (err) {
          console.error(`Claimable balance retrieval failed: ${err}`);
        });
    }
  }, []);

  async function main(publicKey, secretKey, userDestination, asset, amount) {
    const userSponsor = StellarSdk.Keypair.fromSecret(secretKey);
    const userClaim = StellarSdk.Keypair.fromPublicKey(userDestination); //public julian

    // NOTE: Proper error checks are omitted for brevity; always validate things!

    const Account = await server.loadAccount(publicKey).catch(function (err) {
      console.error(`Failed to load ${publicKey}: ${err}`);
    });
    if (!Account) {
      return;
    }

    // Create a claimable balance with our two above-described conditions.

    const bCanClaim = StellarSdk.Claimant.predicateUnconditional();
    const aCanReclaim = StellarSdk.Claimant.predicateUnconditional();

    // Create the operation and submit it in a transaction.
    let claimableBalanceEntry = StellarSdk.Operation.createClaimableBalance({
      claimants: [
        new StellarSdk.Claimant(userDestination, bCanClaim),
        new StellarSdk.Claimant(publicKey, aCanReclaim),
      ],
      asset: asset,
      amount: amount,
    });

    let tx = new StellarSdk.TransactionBuilder(Account, {
      fee: StellarSdk.BASE_FEE,
    })
      .addOperation(claimableBalanceEntry)
      .setNetworkPassphrase(StellarSdk.Networks.TESTNET)
      .setTimeout(0)
      .build();

    tx.sign(userSponsor);
    server
      .submitTransaction(tx)
      .then(function (res) {
        console.log(res, "Claimable balance created!");
      })
      .catch(function (err) {
        console.error(`Tx submission failed: ${err}`);
      });
  }
  
  const selectAsset = (event) => {
      if(event.target.value === "XLM") return setAsset(new StellarSdk.Asset.native())
    const asset = assets.filter(
      (element) =>
        element.asset_code === event.target.value
    );
    return setAsset(asset[0]);
  };

  function handleSubmmit(e) {
    e.preventDefault();
    main(publicKey, secretKey, userDestination, asset, amount);
  }


  return (
    <div>
      <form onSubmit={(e) => handleSubmmit(e)}>
        <input
          type="text"
          value={amount}
          name={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={userDestination}
          name={userDestination}
          onChange={(e) => setUserDestination(e.target.value)}
          placeholder="Publick key destination"
        />
        <>
        <Select
                value={asset}
                style={{
                  marginTop: "1.5px",
                  paddingRight: "7.5px",
                  padding: "5px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                  color: "rgb(183, 189, 198)",
                }}
                onChange={(event) => selectAsset(event)}
              >
                <MenuItem disabled value={1}>
                  Select asset
                </MenuItem>
                {assets &&
                  assets.map((element) => {
                    return (
                      <MenuItem
                        value={element.asset_code}
                        key={element.asset_code}
                      >
                        {element.asset_code}
                      </MenuItem>
                    );
                  })}
              </Select>
        </>
        <button type="submit">Create order</button>
      </form>
    </div>
  );
}
