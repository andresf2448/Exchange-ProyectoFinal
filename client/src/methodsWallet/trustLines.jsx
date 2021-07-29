import { Container, Typography, FormControl, TextField, Select, InputLabel, MenuItem, Button, Grid } from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";
import useStyles from 'styles';

export default function ChangeTrust() {
  const classes = useStyles();
  const [assets, setAssets] = useState();
  const [limitAmount, setLimitAmount] = useState();
  const [asset, setAsset] = useState();
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const session = supabase.auth.session();

  const getInfo = async () => {
    const { data: asset } = await supabase.from("assets").select("*");
    const { data: publicKey } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    const { data: secretKey } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    setSecretKey(secretKey[0]?.secret_key);
    setPublicKey(publicKey[0]?.public_key);
    const assetFilter = asset.filter((asset) => asset.code !== "XLM");
    return setAssets(assetFilter);
  };
  if (!assets) getInfo();

  async function trustLine(publicKey, secretKey, asset, limitAmount) {
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
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
          asset: asset,
          limit: limitAmount,
        })
      )

      .setTimeout(0)
      .build();

    transaction.sign(sourceKeypair);

    await server.submitTransaction(transaction);
    
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
    <Container  >
      <Grid container justifyContent="center" alignItems="center" direction="column">
          <Typography variant="h4">Change Trust Assets</Typography>
        <Grid item xs={12} >
            <form onSubmit={(e) => handleSubmit(e)} >
              <FormControl>
                <InputLabel  InputLabel id="demo-simple-select-label">Select an Asset</InputLabel>
                <Select
                  defaultValue=""
                  name="asset"
                  onChange={(event) => selectAsset(event)}
                  style={{paddingBottom: 10}}
                  >
                  {/* <option>Select an Asset</option> */}
                  {assets &&
                    assets.map((element) => {
                      return (
                        <MenuItem 
                          key={element.asset_code} 
                          value={element.asset_code}
                          >
                            {element.asset_code}
                          </MenuItem>
                        );
                      })}
                </Select>
                <TextField
                  type="text"
                  name="limitAmount"
                  placeholder="Limit for trust"
                  onChange={(e) => setLimitAmount(e)}
                  style={{paddingBottom: 10}}
                  />
                <Button 
                  type="submit" 
                  className={classes.yellowButton}
                  style={{paddingBottom: 10}}
                  >
                    Finish
                  </Button>
              </FormControl>
            </form>
        </Grid>
      </Grid>
    </Container>
  );
}
