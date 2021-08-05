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
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import useStyles from "styles";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getFullBalance, getBalance } from "../redux/actions/actions";

export default function ChangeTrust({ publicKey, secretKey, assets, account }) {
  const [limitAmount, setLimitAmount] = useState();
  const [asset, setAsset] = useState();
  const [waiting, setWaiting] = useState(false);
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const classes = useStyles();
  const dispatch = useDispatch();
  let fullAssets = useSelector((state) => state.fullAssets);
  let accountCreated = useSelector((state) => state.account);

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

      transaction.sign(sourceKeypair);

      await server.submitTransaction(transaction).then(() => {
        dispatch(getFullBalance());
        dispatch(getBalance());
        setWaiting(() => false);
        setAsset();
        setLimitAmount();
        Swal.fire({
          title: "Succes!",
          text: "succes",
          icon: "success",
          confirmButtonText: "Cool",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      });
    } catch (err) {
      setAsset();
      setLimitAmount();
      Swal.fire({
        text: "Oh no! Something went wrong.",
        icon: "error",
        confirmButtonText: "Okay!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
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

  useEffect(() => {
    dispatch(getFullBalance());
  }, [fullAssets, dispatch]);

  return (
    <div>
      {accountCreated ? 
      <div>
        <Container style={{ maxHeight: "78vh" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h4">Change Trust Assets</Typography>
            {waiting ? (
              <div>
                <br />
                <br />
                <br />
                <HashLoader color={"#ffd523"} size={40} />
                <br />
                <br />
                <br />
              </div>
            ) : (
              <>
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
                      <div align="center">
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
                <br />
              </>
            )}
            <Grid item xs={12}>
              <TableContainer style={{ maxHeight: "50vh" }}>
                <Table stickyHeader className={classes.adminTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Asset</TableCell>
                      <TableCell align="center">Limit</TableCell>
                      <TableCell align="center">Asset issuer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fullAssets &&
                      fullAssets.map((asset) => {
                        return (
                          <>
                            {asset.asset_type !== "native" ? (
                              <TableRow hover={{ backgroundColor: "black" }}>
                                <TableCell align="center">
                                  {asset.asset_code}
                                </TableCell>
                                <TableCell align="center">
                                  {parseFloat(asset.limit).toFixed(2)}
                                </TableCell>
                                <TableCell align="center">
                                  {asset.asset_issuer}
                                </TableCell>
                              </TableRow>
                            ) : null}
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </div>
      : <div align='center'>
      <Typography variant="h4">You have to create an account to change trust</Typography>
      </div> }
    </div>
  );
}
