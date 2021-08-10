import { useState, useMemo } from "react";
import StellarSdk from "stellar-sdk";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
  },
  input: {
    margin: "1rem",
    textAlign: "center",
    width: "auto",
  },
  buttom: {
    borderRadius: "20px",
    border: "none",
    height: "40px",
    width: "130px",
  },
}));

export default function CreateClaimableBalance({
  secretKey,
  publicKey,
  assets,
}) {
  
  const [userDestination, setUserDestination] = useState();
  const [asset, setAsset] = useState();
  const [amount, setAmount] = useState();
  const classes = useStyles();
  const server = useMemo(
    () => new StellarSdk.Server("https://horizon-testnet.stellar.org"),
    []
  );


  async function main(publicKey, secretKey, userDestination, asset, amount) {
    const userSponsor = StellarSdk.Keypair.fromSecret(secretKey);

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
    if (event.target.value === "XLM")
      return setAsset(new StellarSdk.Asset.native());
    const asset = assets.filter(
      (element) => element.asset_code === event.target.value
    );
    return setAsset(asset[0]);
  };

  function handleSubmmit(e) {
    e.preventDefault();
    main(publicKey, secretKey, userDestination, asset, amount);
  }

  return (
    <div className={classes.container}>
      <form onSubmit={(e) => handleSubmmit(e)} className={classes.form}>
        <TextField
          label={"Public key destination"}
          name="userDestination"
          type="text"
          value={userDestination}
          onChange={(e) => setUserDestination(e.target.value)}
          className={classes.input}
        />
        <TextField
          label={"Amount"}
          name="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={classes.input}
        />

        <Select
          label="Asset"
          value={asset}
          style={{
            height: "3rem",
            margin: "1rem",
            paddingRight: "7.5px",
            padding: "5px",
            borderRadius: "3px",
            backgroundColor: "rgb(75, 75, 75)",
            color: "black",
          }}
          onChange={(event) => selectAsset(event)}
        >
          <MenuItem disabled value={1}>
            Select asset
          </MenuItem>
          {assets &&
            assets.map((element) => {
              return (
                <MenuItem value={element.asset_code} key={element.asset_code}>
                  {element.asset_code}
                </MenuItem>
              );
            })}
        </Select>

        <button type="submit" className={classes.buttom}>
          Create order
        </button>
      </form>
    </div>
  );
}
