import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import depositHook from "../../customHooks/depositHook";
import { Link } from "react-router-dom";
import { setAset } from "redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../supabase/supabase";
import useStyles from "styles";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";

export const Deposit = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(false);
  const [selector, setSelector] = useState({
    fiat: "",
    crypto: "",
    xlm: "",
  });
  const ourMediaQuery = useMediaQuery("(min-width:720px)");

  const [assetIssuer, setAssetIssuer] = useState();
  const [responseHook, setResponseHook] = useState();
  const assetsCrypto = useSelector((state) => state.assetsCrypto);
  const assetsFiat = useSelector((state) => state.assetsFiat);
  const account = useSelector((state) => state.account);

  const session = supabase.auth.session();

  const classes = useStyles();

  async function getKeys() {
    
    let { data: publicKey } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    let { data: secretKey } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);

    let response;
    if (input.fiat && input.xlm === "") {
      response = await supabase
        .from("assets")
        .select("asset_issuer")
        .eq("asset_code", input.fiat);
    } else if (input.crypto) {
      response = await supabase
        .from("assets")
        .select("asset_issuer")
        .eq("asset_code", input.crypto);
    } else if (input.xlm) {
      response = await supabase
        .from("assets")
        .select("asset_issuer")
        .eq("asset_code", input.xlm);
    }

    setAssetIssuer(() => response.data[0].asset_issuer);
    
    createTransactionId(publicKey[0].public_key, secretKey[0].secret_key);
  }

  function createTransactionId(publicKey, secretKey) {
    if (input && publicKey && secretKey) {
      let assetCode;
      if (input.fiat && input.xlm === "") {
        assetCode = input.fiat;
      } else if (input.crypto) {
        assetCode = input.crypto;
      } else if (input.xlm) {
        assetCode = input.xlm;
      }

      const homeDomain = "localhost:3001";
      
      depositHook({
        publicKey,
        secretKey,
        assetIssuer,
        assetCode,
        homeDomain,
        setResponseHook,
      });
    } else {
      Swal.fire({
        title: "Ups!",
        text: "There's an issue with your keys",
        icon: "warning",
        confirmButtonText: "Hmm..",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
  }

  const handleFiat = async () => {
    await getKeys();
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    dispatch(setAset(event.target.value));
  };

  const handleClick = async (value, currency) => {
    if (currency === "fiat" && assetsFiat.length < 1) {
      return Swal.fire({
        title: "Hold it!",
        text: "You need to trust in tokens FIAT (EURR, ARSR or USDR) to do a deposit",
        icon: "warning",
        confirmButtonText: "Cool",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }

    setResponseHook();
    setInput({
      fiat: "",
      crypto: "",
      xlm: "",
    });
    if (currency === "fiat") {
      setSelector({
        [currency]: value,
        cypto: false,
        xlm: false,
      });
    } else if (currency === "crypto") {
      setSelector({
        [currency]: value,
        fiat: false,
        xlm: false,
      });
    } else if (currency === "xlm") {
      setSelector({
        [currency]: value,
        fiat: false,
        crypto: false,
      });
    }
  };

  const handleLink = () => {
    setSelector({
      fiat: "",
      crypto: "",
      xlm: "",
    });
    setInput({
      fiat: "",
      crypto: "",
      xlm: "",
    });
    setResponseHook();
  };

  return (
    <div>
      {account ? (
        <Container>
          {assetsCrypto && assetsFiat ? (
            <Grid container justifyContent="space-between">                                    
              <Grid item xs={4} align="center">
                <Button
                  className={classes.depositYellowButton}
                  onClick={() => handleClick(true, "fiat")}
                  style={{ marginBottom: 10 }}
                >
                  Deposit Fiat
                </Button>
              </Grid>
              <Grid item xs={4} align="center">
                <Button
                  className={classes.depositYellowButton}
                  onClick={() => handleClick(true, "crypto")}
                >
                  Deposit Crypto
                </Button>
              </Grid>
              <Grid item xs={4} align="center">
                <Button
                  className={classes.depositYellowButton}
                  onClick={() => handleClick(true, "xlm")}
                >
                  Buy XLM/HenryCoin
                </Button>
              </Grid>

              {selector.fiat ? (
                <Grid item align="center" xs={12}>
                  <Typography variant="h6">
                    What FIAT do you want to deposit?
                  </Typography>
                  <Select
                    name="fiat"
                    value={input.fiat}
                    onChange={handleChange}
                  >
                    {assetsFiat
                      ? assetsFiat.map((element) => (
                          <MenuItem value={element.asset_code}>
                            {element.asset_code.substring(0, 3)}
                          </MenuItem>
                        ))
                      : null}
                  </Select>{" "}
                  <br />
                  <Button
                    disabled={!input.fiat}
                    className={classes.depositYellowButton}
                    style={{ marginTop: 10 }}
                    onClick={handleFiat}
                  >
                    Deposit FIAT
                  </Button>{" "}
                  <br />
                  {responseHook && (
                    <Link
                      onClick={handleLink}
                      to={
                        responseHook.interactiveResponse.url +
                        `${input.fiat.slice(0, 3)}`
                      }
                      target="_blank"
                      style={{ textDecoration: "none", color: "primary" }}
                    >
                      Click here to continue
                    </Link>
                  )}
                </Grid>
              ) : null}
              {selector.crypto ? (
                <Grid item align="center" xs={12}>
                  <Typography variant="h6">
                    What crypto do you want to deposit?
                  </Typography>
                  <Select
                    name="crypto"
                    value={input.crypto}
                    onChange={handleChange}
                  >
                    {assetsCrypto
                      ? assetsCrypto.map((element) => (
                          <MenuItem
                            value={
                              element.asset_type === "native"
                                ? "XLM"
                                : element.asset_code
                            }
                          >
                            {element.asset_type === "native"
                              ? "XLM"
                              : element.asset_code}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <br />
                  <Button
                    disabled={!input.crypto}
                    className={classes.depositYellowButton}
                    style={{ marginTop: 10 }}
                    onClick={handleFiat}
                  >
                    Deposit Crypto
                  </Button>{" "}
                  <br />
                  {responseHook && (
                    <Link
                      onClick={handleLink}
                      to={
                        responseHook.interactiveResponse.url + `${input.crypto}`
                      }
                      target="_blank"
                      style={{ textDecoration: "none", color: "primary" }}
                    >
                      Click here to continue
                    </Link>
                  )}
                </Grid>
              ) : null}
              {selector.xlm ? (
                <Grid align="center" xs={12}>
                  <Typography variant="h6">
                    What crypto do you want to buy?
                  </Typography>
                  <Select name="xlm" value={input.xlm} onChange={handleChange}>
                    {assetsCrypto
                      ? assetsCrypto.map((element) => (
                          <MenuItem
                            value={
                              element.asset_type === "native"
                                ? "XLM"
                                : element.asset_code
                            }
                          >
                            {element.asset_type === "native"
                              ? "XLM"
                              : element.asset_code}
                          </MenuItem>
                        ))
                      : null}
                  </Select>{" "}
                  <br />
                  <Typography variant="h6">
                    With what FIAT currency are you going to pay?
                  </Typography>
                  <Select
                    name="fiat"
                    value={input.fiat}
                    onChange={handleChange}
                  >
                    <MenuItem value="ARS">ARS</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                  </Select>{" "}
                  <br />
                  <Button
                    disabled={!input.xlm || !input.fiat}
                    className={classes.depositYellowButton}
                    style={{ marginTop: 10 }}
                    onClick={handleFiat}
                  >
                    Buy Crypto
                  </Button>{" "}
                  <br />
                  {responseHook && (
                    <Link
                      onClick={handleLink}
                      to={
                        responseHook.interactiveResponse.url +
                        `${input.fiat.slice(0, 3)}${input.xlm}`
                      }
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        backgroundColor: "white",
                        borderRadius: "2px",
                      }}
                    >
                      Click here to continue
                    </Link>
                  )}
                </Grid>
              ) : null}
            </Grid>
          ) : (
            <div align="center">
              <br />
              <br />
              <br />

              <HashLoader color={"#ffd523"} size={40} />
              <br />
              <br />
              <br />
              <br />
            </div>
          )}
        </Container>
      ) : (
        <Typography variant="h4">
          You have to create an account to deposit
        </Typography>
      )}
    </div>
  );
};
