import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";
import useStyles from "styles";

export default function ManageBuyOffer({
  secretKey,
  assets,
  setUpdateOffers,
  publicKey,
}) {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  // const [firstSelect, setFirstSelect] = useState(1)
  // const [secondSelect, setSecondSelect] = useState(1)

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const classes = useStyles();

  const updateTransactions = async () => {
    await makeBuyOffer();
    return setUpdateOffers(true);
  };

  let ask = undefined;
  if (assetAsk && ask === undefined && assetAsk.asset_code !== "XLM") {
    const { asset_code, asset_issuer } = assetAsk;
    ask = new StellarSdk.Asset(asset_code, asset_issuer);
  } else ask = StellarSdk.Asset.native();

  let bid = undefined;

  if (assetBid && bid === undefined && assetBid.asset_code !== "XLM") {
    const { asset_code, asset_issuer } = assetBid;
    bid = new StellarSdk.Asset(asset_code, asset_issuer);
  } else bid = StellarSdk.Asset.native();

  async function makeBuyOffer() {
    try {
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

      const [
        {
          max_fee: { mode: fee },
        },
        account,
      ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);

      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })

        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: bid,
            limit: "10000",
          })
        )
        .addOperation(
          StellarSdk.Operation.manageBuyOffer({
            selling: ask,
            buying: bid,
            buyAmount: amount,
            price: price,
          })
        )
        .setTimeout(10000000)
        .build();

      transaction.sign(sourceKeypair);
      await server.submitTransaction(transaction);
    } catch (e) {
      console.error("Oh no! Something went wrong.");
      console.error(e);
    }
  }

  const selectAssetAsk = (event) => {
    const asset = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBid
    );
    return setAssetAsk(asset[0]);
  };

  const selectAssetBid = (event) => {
    const asset = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetAsk
    );
    return setAssetBid(asset[0]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateTransactions();
  }
  // function handleChange(event) {
  //   selectAssetAsk(event);
  //   setFirstSelect(event.target.value)
  // }
  // function handleChange2(event) {
  //   selectAssetBid(event);
  //   setSecondSelect(event.target.value);
  // }

  return (
    <Card className={classes.cardSaleOffer} >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container >
          <Grid item xs={12}>
            <Typography>Create your sale offer:</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              variant="standard"
              value={assetAsk}
              onChange={(event) => selectAssetAsk(event)}
            >
              <MenuItem disabled value={1}>
                Buy asset
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
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              value={amount}
              type="text"
              name="amount"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount to sell"
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              value={assetBid}
              variant="standard"
              onChange={(event) => selectAssetBid(event)}
            >
              <MenuItem disabled value={1}>
                Bid asset
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
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              value={price}
              type="text"
              name="price"
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Price per token"
            />
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              className={classes.invitedYellowButton}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
