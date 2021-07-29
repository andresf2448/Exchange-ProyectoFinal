import {Container, Typography, Button, Select, MenuItem, Grid} from '@material-ui/core';
import { useState } from 'react';
import depositHook from "../../customHooks/depositHook";
import { Link } from 'react-router-dom';
import { setAset } from 'redux/actions/actions';
import { useDispatch } from 'react-redux';
import { supabase } from "../../supabase/supabase";
import useStyles from "styles";


  // const [publicKey, setPublicKey] = useState();
  // const [secretKey, setSecretKey] = useState();
  // const [assetIssuer, setAssetIssuer] = useState();
  // const [responseHook, setResponseHook] = useState();

  // const session = supabase.auth.session();

  // const classes = useStyles();

  // async function getKeys() {
  //   let { data: publicKey } = await supabase
  //     .from("datauser")
  //     .select("public_key")
  //     .eq("id_user", session.user.id);

  //   let { data: secretKey } = await supabase
  //     .from("wallet")
  //     .select("secret_key")
  //     .eq("id_user", session.user.id);

  //   let response;
  //   if (input.fiat && input.xlm === "") {
  //     response = await supabase
  //       .from("assets")
  //       .select("asset_issuer")
  //       .eq("asset_code", input.fiat);
  //   } else if (input.crypto) {
  //     response = await supabase
  //       .from("assets")
  //       .select("asset_issuer")
  //       .eq("asset_code", input.crypto);
  //   } else if (input.xlm) {
  //     response = await supabase
  //       .from("assets")
  //       .select("asset_issuer")
  //       .eq("asset_code", input.xlm);
export const Deposit = ()=>{
    const dispatch = useDispatch()
    const [input, setInput] = useState(false)
    const [selector, setSelector] = useState({
        fiat: '',
        crypto: '',
        xlm: ''
    })
    
    const [assetIssuer, setAssetIssuer] = useState();
    const [responseHook, setResponseHook] = useState()
    
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
        
        let response
        if (input.fiat && input.xlm === '') {
            response = await supabase
            .from('assets')
            .select('asset_issuer')
            .eq('asset_code', input.fiat)

        } else if(input.crypto) {
            response = await supabase
            .from('assets')
            .select('asset_issuer')
            .eq('asset_code', input.crypto)

        } else if(input.xlm) {
            response = await supabase
            .from('assets')
            .select('asset_issuer')
            .eq('asset_code', input.xlm)
        }
          
          setAssetIssuer(() => response.data[0].asset_issuer)
          
        createTransactionId(publicKey[0].public_key, secretKey[0].secret_key)
      }

      function createTransactionId(publicKey, secretKey) {
          
          if (input && publicKey && secretKey) {
          
            let assetCode
            if (input.fiat && input.xlm === '') {
                assetCode = input.fiat
    
            } else if(input.crypto) {
                assetCode = input.crypto
    
            } else if(input.xlm) {
                assetCode = input.xlm
            }
            
            const homeDomain = "localhost:3001";
            
            depositHook({ publicKey, secretKey, assetIssuer, assetCode, homeDomain, setResponseHook })
            
          } else {
              alert('Problems with your keys')
          }

      }


    const handleFiat = async () => {   
    await getKeys()
        
    }

    const handleChange = (event) => {
        
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        dispatch(setAset(event.target.value))

    }

    const handleClick = async (value, currency) => {
        let {data} = await supabase
        .from('UserAnchor')
        .select('firstName, lastName')
        .eq('id_user', session.user.id)

        if (data.length < 1) {
            return alert('You need to complete your profile to do a deposit')
        }
        
        setResponseHook()
        setInput({
            fiat: '',
            crypto: '',
            xlm: ''
        })
        if (currency === 'fiat') {
        setSelector({
            [currency]: value,
            cypto: false,
            xlm: false
        })

    } else if(currency === 'crypto' ) {
        setSelector({
            [currency]: value,
            fiat: false,
            xlm: false
        })

    } else if(currency === 'xlm' ) {
        setSelector({
            [currency]: value,
            fiat: false,
            crypto: false
        })

    }
    }

  return (
    <Container>
      <Grid container justifyContent='space-between'>
        <Grid item xs={4} align='center'>
          <Button className={classes.depositYellowButton} onClick={() => handleClick(true, "fiat")} style={{marginBottom: 10 }}>
            Deposit Fiat
          </Button>
        </Grid>
        <Grid xs={4} align='center'>
          <Button className={classes.depositYellowButton} onClick={() => handleClick(true, "crypto")}>
            Deposit Crypto
          </Button>
        </Grid>
        <Grid xs={4} align='center'>
          <Button className={classes.depositYellowButton} onClick={() => handleClick(true, "xlm")}>
            Buy XLM/HenryCoin
          </Button>
        </Grid>

        {selector.fiat ? (
          <Grid align='center' xs={12}>
            <Typography variant="h6">
              What FIAT do you want to deposit?
            </Typography>
            <Select name="fiat" value={input.fiat} onChange={handleChange}>
              <MenuItem value="ARSR">ARS</MenuItem>
              <MenuItem value="EURR">EUR</MenuItem>
              <MenuItem value="USDR">USD</MenuItem>
            </Select>{" "}
            <br />
            <Button
              disabled={!input.fiat}
              className={classes.depositYellowButton} 
              style={{marginTop: 10 }}
              onClick={handleFiat}
              >
              Deposit FIAT
            </Button>{" "}
            <br />
            {responseHook && (
              <Link
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
          <Grid align='center' xs={12}>
            <Typography variant="h6">
              What crypto do you want to deposit?
            </Typography>
            <Select name="crypto" value={input.crypto} onChange={handleChange}>
              <MenuItem value="XLM">XLM</MenuItem>
              <MenuItem value="SRT">SRT</MenuItem>
              <MenuItem value="HenryCoin">HenryCoin</MenuItem>
            </Select>{" "}
            <br />
            <Button
              disabled={!input.crypto}
              className={classes.depositYellowButton} 
              style={{marginTop: 10 }}
              onClick={handleFiat}
            >
              Deposit Crypto
            </Button>{" "}
            <br />
            {responseHook && (
              <Link
                to={responseHook.interactiveResponse.url + `${input.crypto}`}
                target="_blank"
                style={{ textDecoration: "none", color: "primary" }}
              >
                Click here to continue
              </Link>
            )}
          </Grid>
        ) : null}
        {selector.xlm ? (
          <Grid align='center' xs={12}>
            <Typography variant="h6">What crypto do you want to buy?</Typography>
            <Select name="xlm" value={input.xlm} onChange={handleChange}>
              <MenuItem value="XLM">XLM</MenuItem>
              <MenuItem value="HenryCoin">HenryCoin</MenuItem>
            </Select>{" "}
            <br />
            <Typography variant="h6">
              With what FIAT currency are you going to pay?
            </Typography>
            <Select name="fiat" value={input.fiat} onChange={handleChange}>
              <MenuItem value="ARS">ARS</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>{" "}
            <br />
            <Button
              disabled={!input.xlm || !input.fiat}
              className={classes.depositYellowButton} 
              style={{marginTop: 10 }}
              onClick={handleFiat}
            >
              Buy Crypto
            </Button>{" "}
            <br />
            {responseHook && (
              <Link
                to={
                  responseHook.interactiveResponse.url +
                  `${input.fiat.slice(0, 3)}${input.xlm}`
                }
                target="_blank"
                style={{ textDecoration: "none", backgroundColor:'white', borderRadius: '2px'}}
              >
                Click here to continue
              </Link>
            )}
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};
