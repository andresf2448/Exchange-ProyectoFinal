import './cryptoGraphics.css';
import useStyles from 'styles.js';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card } from '@material-ui/core';
import SkewLoader from 'react-spinners/SkewLoader';

import btcIcon from './cryptoIcons/bitcoin.png'
import ethIcon from './cryptoIcons/ethereum2.png'
import chzIcon from './cryptoIcons/chili.jpg'
import filIcon from './cryptoIcons/filecoin.png'
import adaIcon from './cryptoIcons/ada2.png'
import bnbIcon from './cryptoIcons/binance.png'

let ethSocket
let btcSocket
let chzSocket
let filSocket
let adaSocket
let bnbSocket


export const CryptoGraphics = () => {




  const classes = useStyles();
  // Coins states
  const [eth, setEth] = useState({ s: 'ETH', prevPrice: 0, price: 0, color: 'equal', img: ethIcon })
  const [btc, setBtc] = useState({ s: 'BTC', prevPrice: 0, price: 0, color: 'equal', img: btcIcon })
  const [chz, setChz] = useState({ s: 'CHZ', prevPrice: 0, price: 0, color: 'equal', img: chzIcon })
  const [fil, setFil] = useState({ s: 'FIL', prevPrice: 0, price: 0, color: 'equal', img: filIcon })
  const [ada, setAda] = useState({ s: 'ADA', prevPrice: 0, price: 0, color: 'equal', img: adaIcon })
  const [bnb, setBnb] = useState({ s: 'BNB', prevPrice: 0, price: 0, color: 'equal', img: bnbIcon })
  const [connection, setConnection] = useState(true);

  let renderData = [eth, btc, chz, fil, ada, bnb];

  function handleConnection() {
    if (connection === true) {
      ethSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
      btcSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
      chzSocket = new WebSocket('wss://stream.binance.com:9443/ws/chzusdt@trade')
      filSocket = new WebSocket('wss://stream.binance.com:9443/ws/filusdt@trade')
      adaSocket = new WebSocket('wss://stream.binance.com:9443/ws/adausdt@trade')
      bnbSocket = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade')
      
      // websockets errors handlers 
      ethSocket.onerror = (event) => { console.log(event) }
      btcSocket.onerror = (event) => { console.log(event) }
      chzSocket.onerror = (event) => { console.log(event) }
      filSocket.onerror = (event) => { console.log(event) }
      adaSocket.onerror = (event) => { console.log(event) }
      bnbSocket.onerror = (event) => { console.log(event) }
     return
    }
    else {
      return alert('no connection')
    }
  }


  useEffect(() => {

    handleConnection() 
    //Do not delete following code, avoid unrrelevant error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => { 
    
    ethSocket.onmessage = (event) => {
      let dataEth = JSON.parse(event.data);
      updateQuote(dataEth, eth, setEth);
      
    }
    bnbSocket.onmessage = (event) => {
      let dataBnb = JSON.parse(event.data);
      updateQuote(dataBnb, bnb, setBnb);
      
    }

    btcSocket.onmessage = (event) => {
      let dataBtc = JSON.parse(event.data);
      updateQuote(dataBtc, btc, setBtc);
      
    }

    adaSocket.onmessage = (event) => {
      let dataAda = JSON.parse(event.data);
      updateQuote(dataAda, ada, setAda);
      
    }

    chzSocket.onmessage = (event) => {
      let dataChz = JSON.parse(event.data);
      updateQuote(dataChz, chz, setChz);
      
    }

    filSocket.onmessage = (event) => {
      let dataFil = JSON.parse(event.data);
      updateQuote(dataFil, fil, setFil);
      
    }


  });

  

  useEffect(() => {
    
    return () => {

      setConnection(false);

    }
  }, [])

  



  // UPDATE DATA COINS (info, coinState and setCoinState)
  const updateQuote = (dato, coin, setCoin) => {
    let numberPrice = parseFloat(dato.p);
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
      <Grid container className='currencyValues' spacing={2}>
        {
          renderData.map((e, i) => (
            <Grid item sm={12} key={i}>
              <Card className={classes.cryptoCurrency}>
                <Grid item sm={3}>
                  <img className='cryptoIcons' src={e.img} alt='no img' />
                </Grid>
                <Grid item sm={3}>
                  <h2 className='coinSymbol'> {e.s} </h2>
                </Grid>
                <Grid item sm={3}>
                  <h3 className={e.color}>{e.price ? `$ ${e.price}` : <SkewLoader size={10} />} </h3>
                </Grid>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}









