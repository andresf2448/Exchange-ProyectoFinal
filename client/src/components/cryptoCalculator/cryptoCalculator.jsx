import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, Grid, Typography, Container } from '@material-ui/core';
import axios from 'axios';
import BuyButton from 'components/stripe/buyButton';
import useStyles from 'styles';
//API de cryptocompare.com

export const CryptoCalculator = () => {

    const [convertion, setConvertion] = useState({ firstCoin: '', secondCoin: '', amount: 0 });
    const [result, setResult] = useState('');
    const [firstCurrency, setFirstCurrency] = useState(1);
    const [secondCurrency, setSecondCurrency] = useState(1);

    const classes = useStyles();

    async function convert() {
        
        if(convertion.amount === 0 || !convertion.amount){return alert('Amount required')}
        if(convertion.firstCoin === '' || convertion.firstCoin === 1 || convertion.secondCoin === '' || convertion.secondCoin === 1){return alert('Invalid currency')}
        let currencies = await axios.get(`https://min-api.cryptocompare.com/data/price?api_key={0aec49a900c2d7469630114260688bb1914813d1f365aa38f494f6c8a6e946d1}&fsym=${convertion.firstCoin}&tsyms=${convertion.secondCoin}`)
        if(currencies.data.Response === 'Error'){
            return alert('Something went wrong');
        }
        var total = Object.values(currencies.data)[0] * convertion.amount;
         
        setResult(total);
    }

    function handleChange(orderCoin, e){
        if(orderCoin === 'first'){

            setFirstCurrency(e.target.value);
            
            setConvertion({ ...convertion, firstCoin: e.target.value })
            return
        }
        setSecondCurrency(e.target.value)
        setConvertion({ ...convertion, secondCoin: e.target.value })
    }

    useEffect(() => {
        if (convertion.amount === 0 || convertion.amount === '') {
            setResult('')
        }
    }, [convertion])

    useEffect(() => {
        setResult('')
    }, [convertion])
  
    return (
    <Container>
        <Grid container style={{marginTop:'100px'}}>   

            <Grid item sm={12}>
                <Typography style={{textAlign:'center', marginRight:'30px', marginBottom:'10px'}}>Converter</Typography>
            </Grid>

            <Grid item sm={6} >
            <Select style={{padding:'5px', borderRadius: '3px', backgroundColor: 'white'}} displayEmpty value={firstCurrency} onChange={(e) => handleChange('first', e)}>
                    <MenuItem disabled value={1}>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>
    
                {/* <TextField required margin='normal' placeholder='Amount' variant='outlined' color='secondary' onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })} /> */}
                <input type="text" required placeholder='Amount' style={{padding:'10px', width:'73px', marginTop:'8px', borderRadius:'4px'}} onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })}/>
            </Grid>

            <Grid item sm={6} style={{marginBottom:'5px'}}>
       
                <Select  style={{padding:'5px', borderRadius: '3px', backgroundColor: 'white'}} displayEmpty value={secondCurrency}onChange={(e) => handleChange('second', e) }>
                    <MenuItem disabled value={1}>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>
               
                {/* <TextField disabled={true} value={result}  margin='normal' /> */}
                <input type="text" disabled value={result} style={{padding:'9px', marginTop:'10px', width:'78px'}} />
              
            </Grid>
            <Button 
            fullWidth={true} 
            variant="contained" 
            onClick={() => convert()}
            disabled={convertion.firstCoin === '' || convertion.secondCoin === '' || convertion.amount === 0 || convertion.amount === ''}
            >
            Convert
            </Button>
            <BuyButton
            color='secondary' 
            convertion={convertion}
            result={result} 
            />
        </Grid>

    </Container>)


}

