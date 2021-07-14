import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, Grid, Typography, Container } from '@material-ui/core';
import axios from 'axios';
//API de cryptocompare.com

export const CryptoCalculator = () => {

    const [convertion, setConvertion] = useState({ firstCoin: '', secondCoin: '', amount: 0 });
    const [result, setResult] = useState('');
    const [firstCurrency, setFirstCurrency] = useState(1);
    const [secondCurrency, setSecondCurrency] = useState(1);

    async function convert() {
        
            if(convertion.amount === 0 || !convertion.amount){return alert('Amount required')}
            if(convertion.firstCoin === '' || convertion.firstCoin === 1 || convertion.secondCoin === '' || convertion.secondCoin === 1){return alert('Invalid currency')}
            let currencies = await axios.get(`https://min-api.cryptocompare.com/data/price?api_key={0aec49a900c2d7469630114260688bb1914813d1f365aa38f494f6c8a6e946d1}&fsym=${convertion.firstCoin}&tsyms=${convertion.secondCoin}`)
            if(currencies.data.Response === 'Error'){
                return alert('Something went wrong');
            }
            var total = Object.values(currencies.data)[0] * convertion.amount;
            // console.log(currencies);
            
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


    
    return (
    <Container>
        <Grid container>
            {/* <form > */}
            {/* <div className='column'> */}

            {/* <select onChange={(e) => setConvertion({ ...convertion, firstCoin: e.target.value })}>

                <option value="" selected disabled>--First Currency--</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>

            </select> */}
            <Grid item sm={12}>
                <Typography variant='h4'>Converter</Typography>
            </Grid>

            <Grid item sm={6}>
                <Select displayEmpty value={firstCurrency} onChange={(e) => handleChange('first', e)}>
                    <MenuItem disabled value={1}>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>


                {/* <input type="number" placeholder='amount' onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })} /> */}
                <TextField required margin='normal' placeholder='amount' onChange={(e) => setConvertion({...convertion, amount: e.target.value})} />
            </Grid>

            <Grid item sm={6}>
                {/* </div>
        <div className='column'> */}

                {/* <select onChange={(e) => setConvertion({ ...convertion, secondCoin: e.target.value })}>
                <option value="" selected disabled>Second Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
            </select> */}
                <Select displayEmpty value={secondCurrency}onChange={(e) => handleChange('second', e) }>
                    <MenuItem disabled value={1}>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>
                {/* <input type="number" disabled value={result} /> */}
                <TextField disabled={true} value={result} margin='normal' />
                {/* </div> */}
                {/* <input type="button" value='Convert' onClick={() => convert()} /> */}
                {/* </form> */}

            </Grid>
            <Button fullWidth={true} variant="contained" onClick={() => convert()}>Convert</Button>
        </Grid>

    </Container>)


}





// const classes = useStyles();
//     return(
//         <Paper className={classes.root} style={{ height: "20.5rem" }}>
//             CRYPTOCALCULATOR
//         </Paper>
//     )