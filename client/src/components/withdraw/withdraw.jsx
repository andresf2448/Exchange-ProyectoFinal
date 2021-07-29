import {Container, Typography, FormControl, TextField, Select, MenuItem, Button} from '@material-ui/core';
import { useState } from 'react';
import validateCbu from 'arg.js'
import axios from 'axios'
import { supabase } from "supabase/supabase";
import validate from './withdrawTool'

export const Withdraw = ()=>{
    const session = supabase.auth.session();
    const [cbu, setCbu] = useState(false)
    const [transaction, setTransaction] = useState(false)
    const [input, setInput] = useState({
        currency: '',
        amount: '',
        cbu: ''
    })
    const [error, setError] = useState({
        isError: true,
        email: "",
        amount: "",
      })

    const handleChange = (event) => {
        setInput((input) => {return {
            ...input,
            [event.target.name]: event.target.value
        }})
        setError(
            validate({
                ...input,
                [event.target.name]: event.target.value
            })
        )

        if(event.target.name === 'cbu') {
            setCbu(() => validateCbu.cbu.isValid(event.target.value))
        }
    }

    const handleSubmit = async () => {
                
          let succes = await axios.post("/payment", {
            sourceId: session.user.id,
            receiverId: 'rocket',
            amount: input.amount,
            currency: input.currency
          });

          setTransaction(succes.data)
    }


    return (
        <Container>
            <FormControl >
            <Typography variant='h4'>Select options to withdraw</Typography>
            
                <Select  fullWidth={true} name='currency' value={input.currency} onChange={handleChange} >
                <MenuItem value='ARSR'>ARSR</MenuItem>
                <MenuItem value='EURR'>EURR</MenuItem>
                <MenuItem value='USDR'>USDR</MenuItem>
               
                
              </Select>
            
                <TextField
                name='amount'
                type='text'
                label={error.amount === "" ? "Amount" : error.amount}
                color={error.amount === "" ? "primary" : "secondary"}
                disabled={!input.currency}
                onChange={handleChange}
                value={input.amount}
                placeholder='Amount'
                />
                <TextField
                name='cbu'
                type='text'
                onChange={handleChange}
                value={input.cbu}
                placeholder='CBU account'
                />
                <Button type='submit' disabled={!cbu || !input.currency || error.amount} onClick={handleSubmit}>Withdraw</Button>
            </FormControl>
            {transaction ? <div>
                <Typography variant="h5">Your transfer</Typography>
                <Typography variant="h6">{transaction.amount} {transaction.currency.toUpperCase()}</Typography>
                <Typography variant="h5">Fee percentage</Typography>
                <Typography variant="h6">{transaction.feePercentage}%</Typography>
                <Typography variant="h5">Fee Amount</Typography>
                <Typography variant="h6">{transaction.fee} {transaction.currency.toUpperCase()}</Typography>
            </div>
            : null}
        </Container>
    )
}