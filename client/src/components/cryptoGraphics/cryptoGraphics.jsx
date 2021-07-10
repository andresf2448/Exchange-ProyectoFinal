import { Container, Typography, Grid, Card } from '@material-ui/core';
import useStyles from 'styles.js'
import { useEffect, useState } from 'react';
import './cryptoGraphics.css';

// webSocket data
let ethSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
let btcSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let chzSocket = new WebSocket('wss://stream.binance.com:9443/ws/chzusdt@trade');
let filSocket = new WebSocket('wss://stream.binance.com:9443/ws/filusdt@trade');
let adaSocket = new WebSocket('wss://stream.binance.com:9443/ws/adausdt@trade');
let bnbSocket = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');
// erros handlres
ethSocket.onerror = (event) => { console.log(event) }
btcSocket.onerror = (event) => { console.log(event) }
chzSocket.onerror = (event) => { console.log(event) }
filSocket.onerror = (event) => { console.log(event) }
adaSocket.onerror = (event) => { console.log(event) }
bnbSocket.onerror = (event) => { console.log(event) }


export const CryptoGraphics= ()=>{
    const classes = useStyles();

// Coins states
  const [eth, setEth] = useState({ prevPrice: 0, price: 0, color: 'equal' })
  const [btc, setBtc] = useState({ prevPrice: 0, price: 0, color: 'equal' })
  const [chz, setChz] = useState({ prevPrice: 0, price: 0, color: 'equal' })
  const [fil, setFil] = useState({ prevPrice: 0, price: 0, color: 'equal' })
  const [ada, setAda] = useState({ prevPrice: 0, price: 0, color: 'equal' })
  const [bnb, setBnb] = useState({ prevPrice: 0, price: 0, color: 'equal' })

  useEffect(() => {
    ethSocket.onmessage = (event) => {
      let dataEth = JSON.parse(event.data);
      updateQuote(dataEth, eth, setEth);
    }

    btcSocket.onmessage = (event) => {
      let dataBtc = JSON.parse(event.data);
      updateQuote(dataBtc, btc, setBtc);
    }

    chzSocket.onmessage = (event) => {
      let dataChz = JSON.parse(event.data);
      updateQuote(dataChz, chz, setChz);
    }

    filSocket.onmessage = (event) => {
      let dataFil = JSON.parse(event.data);
      updateQuote(dataFil, fil, setFil);
    }

    adaSocket.onmessage = (event) => {
      let dataAda = JSON.parse(event.data);
      updateQuote(dataAda, ada, setAda);
    }

    bnbSocket.onmessage = (event) => {
      let dataBnb = JSON.parse(event.data);
      updateQuote(dataBnb, bnb, setBnb);
    }
  });

  // UPDATE DATA COINS (info, prev info and color)
  const updateQuote = (dato, coin, setCoin) => {
    let numberPrice = parseFloat(dato.p);
    // .toFixed(4) => String return
    setCoin({ ...coin, prevPrice: numberPrice })
    if (coin.prevPrice > coin.price) {
      return setCoin({ ...coin, price: numberPrice, color: 'major' })
    }
    else if (coin.prevPrice < coin.price) {
      return setCoin({ ...coin, price: numberPrice, color: 'minor' })
    }
    else {
      return setCoin({ ...coin, color: 'equal' });
    }
  }

  return (
  <Container>
        <Typography variant='h3'>Crypto USD trade</Typography>
          <Grid container className='currencyValues' sm={12} spacing={2}>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> ETH </h2>
                  <div className="toFixedCoin">
                    <h3 className={eth.color}>{eth.price ? eth.price : 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> BTC </h2>
                  <div className="toFixedCoin">
                    <h3 className={btc.color}>{btc.price ? btc.price : 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> CHZ </h2>
                  <div className="toFixedCoin">
                    <h3 className={chz.color}>{chz.price ? chz.price: 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> FIL </h2>
                  <div className="toFixedCoin">
                    <h3 className={fil.color}>{fil.price ? fil.price: 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> ADA </h2>
                  <div className="toFixedCoin">
                    <h3 className={ada.color}>{ada.price ? ada.price : 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.card}>
                  <h2> BNB </h2>
                  <div className="toFixedCoin">
                    <h3 className={bnb.color}>{bnb.price ? bnb.price : 'Searching currency value'}</h3>
                  </div>
              </Card>
            </Grid>
          </Grid>

  </Container>     
    )
}

    






