import {Container, Typography, Button, Select, MenuItem} from '@material-ui/core';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { setAset } from 'redux/actions/actions';
import { useDispatch } from 'react-redux';

export const Deposit = ()=>{
    const [input, setInput] = useState()
    const [transaction, setTransaction] = useState()
    const dispatch = useDispatch()
    // const history = useHistory()

    const handleFiat = async () => {   
    let transactionBack = await axios.post('http://localhost:3001/transactions/deposit/interactive', {
      asset_code: input + 'R',
      account: '',
      
    })    
    setTransaction(transactionBack.data)
        // history.push('/kycflow')
    }

    const handleChange = (event) => {
        setInput(event.target.value)
        dispatch(setAset(event.target.value))
    }

    return (
        <Container>
            <Typography variant='h3'>soy Deposit</Typography>
            <Select value={input} onChange={handleChange} >
                <MenuItem value='ARS'>ARS</MenuItem>
                <MenuItem value='EUR'>EUR</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
          </Select>
            <Button onClick={handleFiat}>FIAT</Button>
            {transaction ? <Link to={transaction.url}>Link</Link> : null}
            <Button>CRYPTO</Button>
        </Container>
    )
}