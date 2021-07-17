import { Button, TextField, Select, MenuItem, Grid, Typography, Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuyButton from 'components/stripe/buyButton';

//API de cryptocompare.com

export const CryptoCalculator = () => {

    const [convertion, setConvertion] = useState({ firstCoin: '', secondCoin: '', amount: 0 });
    const [result, setResult] = useState('');

    async function convert() {
        let currencies = await axios.get(`https://min-api.cryptocompare.com/data/price?api_key={0aec49a900c2d7469630114260688bb1914813d1f365aa38f494f6c8a6e946d1}&fsym=${convertion.firstCoin}&tsyms=${convertion.secondCoin}`)
        var total = Object.values(currencies.data)[0] * convertion.amount;
        // console.log(currencies);
        setResult(total);
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
        <Grid container className='calculatorContainer'>
          
            <Grid item sm={12}>
                <Typography variant='h4'>Converter</Typography>
            </Grid>

            <Grid item sm={6}>
                <Select displayEmpty value={convertion.firstCoin} onChange={(e) => setConvertion({ ...convertion, firstCoin: e.target.value })}>
                    <MenuItem disabled>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>


                
                <TextField required margin='normal' placeholder='Amount' onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })} />
            </Grid>

            <Grid item sm={6}>
       
                <Select displayEmpty onChange={(e) => setConvertion({ ...convertion, secondCoin: e.target.value })}>
                    <MenuItem disabled>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>
               
                <TextField disabled={true} value={result} margin='normal' />
              
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
            convertion={convertion}
            result={result} 
            />
        </Grid>

    </Container>)


}

