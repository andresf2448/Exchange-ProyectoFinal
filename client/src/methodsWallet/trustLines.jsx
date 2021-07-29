import {
  Container,
  Typography,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";

export default function ChangeTrust({ publicKey, secretKey, assets, account }) {
  const [limitAmount, setLimitAmount] = useState();
  const [asset, setAsset] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  async function trustLine() {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(
      secretKey
    );
    const [
      {
        max_fee: { mode: fee },
      },
    ] = await Promise.all([server.feeStats()]);
    try{
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: asset,
            limit: limitAmount
          })
        )
  
        .setTimeout(0)
        .build();
      transaction.sign(sourceKeypair);
  
      await server.submitTransaction(transaction);
    }catch(err){
      console.log(err)
    }
  }

  const selectAsset = (event) => {
    const asset = assets.filter(
      (element) => element.asset_code === event.target.value
    );
    const assetUntrust = new StellarSdk.Asset(
      asset[0].asset_code,
      asset[0].asset_issuer
    );
    return setAsset(assetUntrust);
  };

  function handleSubmit(e) {
    e.preventDefault();
    trustLine(publicKey, secretKey, asset, limitAmount);
  }
  return (
    <div>
      <div>
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h4">Change Trust Assets</Typography>
            <Grid item xs={12}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                  <InputLabel InputLabel id="demo-simple-select-label">
                    Select an Asset
                  </InputLabel>
                  <Select
                    defaultValue=""
                    name="Asset"
                    onChange={(event) => selectAsset(event)}
                    style={{ paddingBottom: 10 }}
                  >
                    {/* <option>Select an Asset</option> */}
                    {assets &&
                      assets.map((element) => {
                        if (element.asset_code === "XLM") {
                          return;
                        } else {
                          return (
                            <MenuItem
                              key={element.asset_code}
                              value={element.asset_code}
                            >
                              {element.asset_code}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                  <TextField
                    type="text"
                    name="limitAmount"
                    placeholder="Limit for trust"
                    onChange={(e) => setLimitAmount(e.target.value)}
                    style={{ paddingBottom: 10 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{ paddingBottom: 10 }}
                  >
                    Finish
                  </Button>
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div>
        {account &&
          account.balances.map((asset) => (
            <div key={asset.asset_code}>
              {" "}
              Asset: {asset.asset_code}, Limit: {asset.limit} Asset issuer:{" "}
              {asset.asset_issuer}{" "}
            </div>
          ))}
      </div>
    </div>
  );
}
