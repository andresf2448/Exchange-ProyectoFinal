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
  Divider
} from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";
import useStyles from "styles";
import HashLoader from "react-spinners/HashLoader";

export default function ChangeTrust({ publicKey, secretKey, assets, account }) {
  const [limitAmount, setLimitAmount] = useState();
  const [asset, setAsset] = useState();
  const [waiting, setWaiting] = useState(false);
  const server = StellarSdk.Server("https://horizon-testnet.stellar.org");
  const classes = useStyles();

  async function trustLine() {
    setWaiting(() => true);
    const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
    const [
      {
        max_fee: { mode: fee },
      },
    ] = await Promise.all([server.feeStats()]);
    try {
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: asset,
            limit: limitAmount,
          })
        )
        .setTimeout(0)
        .build();
      console.log(asset);
      transaction.sign(sourceKeypair);

      await server.submitTransaction(transaction).then(() => {
        setWaiting(() => false);
      });
    } catch (err) {
      console.log(err);
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
    trustLine(publicKey, secretKey, asset, limitAmount.toString());
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
                  <InputLabel id="demo-simple-select-label">
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
                          return null;
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
                    placeholder="Quantity of trust in this asset"
                    onChange={(e) => setLimitAmount(e.target.value)}
                    style={{ paddingBottom: 10 }}
                  />
                  <div align='center'>
                  <Button
                    type="submit"
                    className={classes.yellowButton}
                    style={{ paddingBottom: 10 }}
                  >
                    Finish
                  </Button>
                  </div>
                </FormControl>
              </form>
            </Grid>
            <br/>
            {waiting ? <HashLoader color={"#ffd523"} size={20} /> : null}
            <Grid item xs={12}>
              {account &&
                account.balances.map((asset) => (
                  <div align="center" key={asset.asset_code}>
                    <Divider className={classes.divider} />
                    <br/>
                    {asset.asset_type !== "native" ? (
                      <div style={{
                        disply: "flex",
                        justifyContent: "center",
                      }}>
                        <div>
                          <div 
                          className='conteiner'
                            style={{
                              'display': 'flex',
                              'justifyContent': 'space-evenly',
                              'flexDirection':'colum'
                            }}
                          >
                            <div >
                              <Typography variant="h5">Asset</Typography>
                              <Typography variant="h6">
                                {" "}
                                {asset.asset_code}
                              </Typography>
                            </div>
                            <div style={{
                              disply: "flex"}}>
                              <Typography variant="h5">Limit</Typography>
                              <Typography variant="h6">
                                {parseFloat(asset.limit).toFixed(2)}{" "}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div>
                          <br />
                          <Typography variant="h5">Asset issuer</Typography>
                          <Typography variant="h6">
                            {" "}
                            {asset.asset_issuer}{" "}
                          </Typography>
                        </div>
                      </div>
                    ) : null}

                    <br />
                    <br />
                  </div>
                ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
