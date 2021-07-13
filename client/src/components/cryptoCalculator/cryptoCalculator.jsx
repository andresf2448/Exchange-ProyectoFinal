import { Button, TextField, Select, MenuItem, Grid, Typography, Container } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
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

    return (
    <Container>
        <Grid container className='calculatorContainer'>
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
                <Select  displayEmpty={true} onChange={(e) => setConvertion({ ...convertion, firstCoin: e.target.value })}>
                    <MenuItem disabled={true}>Currency</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='BTC'>Bitcoin</MenuItem>
                    <MenuItem value='ETH'>Ethereum</MenuItem>
                </Select>


                {/* <input type="number" placeholder='amount' onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })} /> */}
                <TextField required margin='normal' placeholder='amount' onChange={(e) => setConvertion({ ...convertion, amount: e.target.value })} />
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
                <Select  displayEmpty={true} onChange={(e) => setConvertion({ ...convertion, secondCoin: e.target.value })}>
                    <MenuItem disabled={true}>Currency</MenuItem>
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