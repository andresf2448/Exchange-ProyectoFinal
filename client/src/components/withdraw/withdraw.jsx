import {Container, Typography, FormControl, TextField, Select, MenuItem, Button} from '@material-ui/core';
import useStyles from 'styles'
import { useState, useEffect } from 'react';
import validateCbu from 'arg.js'
import axios from 'axios'
import { supabase } from "supabase/supabase";
import validate from './withdrawTool'
import StellarSdk from "stellar-sdk";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";

export const Withdraw = ()=>{
    const session = supabase.auth.session();
    const [cbu, setCbu] = useState(false)
    // const [transaction, setTransaction] = useState(false)
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
    const [account, setAccount] = useState(false)
    const [user, setUser] = useState(false);
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    const classes = useStyles();

    const handleChange = (event) => {
        setInput((input) => {return {
            ...input,
            [event.target.name]: event.target.value
        }})
        setError(
            validate({
                ...input,
                [event.target.name]: event.target.value
            }, user.balances)
        )

        if(event.target.name === 'cbu') {
            setCbu(() => validateCbu.cbu.isValid(event.target.value))
        }
    }

    const handleSubmit = async () => {
                
          let succes = await axios.post("http://localhost:3001/payment", {
            sourceId: session.user.id,
            receiverId: 'rocket',
            amount: input.amount,
            currency: input.currency
          });

          Swal.fire({
            title: "Success!",
            html: `Your transfer <br> ${succes.data.amount} ${succes.data.currency} <br> Fee percentage <br> ${succes.data.feePercentage}% <br> Fee Amount <br> ${succes.data.fee} ${succes.data.currency} `,
            icon: "success",
            confirmButtonText: "Cool",
            background: "#1f1f1f",
            confirmButtonColor: "rgb(158, 158, 158)",
          });

        //   setTransaction(succes.data)
    }

    const userExist = async () => {
        let { data } = await supabase
          .from("datauser")
          .select("public_key")
          .eq("id_user", session.user.id);
    
        if (data.length === 0) setUser(false);
        if (data.length > 0) {
          getBalance();
          
        }
      };
    
      const getBalance = async () => {
        let { data } = await supabase
          .from("datauser")
          .select("public_key")
          .eq("id_user", session.user.id);
    
        await server
          .loadAccount(data[0]?.public_key)
          .then((response) => { 
            let filteredAssets = response.balances.filter(element => element.asset_code === 'ARSR' || element.asset_code === 'USDR' || element.asset_code === 'EURR')
            setAccount(filteredAssets)
            setUser(response)
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        userExist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      
    return (
        <Container align='center' style={{height:'38vh'}}>
        {user ? 
            <FormControl >
            <Typography variant='h4'>Select options to withdraw</Typography>
            
                <Select  fullWidth={true} name='currency' value={input.currency} onChange={handleChange} >
                {account && user ? 
                  account.map(element =>                 
                     <MenuItem value={element.asset_code }>{element.asset_code}</MenuItem>
                  )
                  : null}         
                
              </Select>
            
                <TextField
                name='amount'
                margin='dense'
                type='text'
                label={error.amount === "" ? "Amount" : error.amount}
                color={error.amount === "" ? "primary" : "secondary"}
                disabled={!input.currency}
                onChange={handleChange}
                value={input.amount}
                placeholder='Amount'
                />
                <TextField
                margin='dense'
                name='cbu'
                type='text'
                disabled={error.amount || !input.currency || !input.amount}
                onChange={handleChange}
                value={input.cbu}
                placeholder='CBU account'
                />
                <div align='center'>
                <Button type='submit' className={classes.depositYellowButton} disabled={!cbu || !input.currency || error.amount} onClick={handleSubmit}>Withdraw</Button>
                </div>
            </FormControl>
            
            : 
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            <HashLoader color={"#ffd523"} size={40} />
            </div> }
            </Container>
    )
}


// {/* {transaction ? <div>
//                 <Typography variant="h5">Your transfer</Typography>
//                 <Typography variant="h6">{transaction.amount} {transaction.currency.toUpperCase()}</Typography>
//                 <Typography variant="h5">Fee percentage</Typography>
//                 <Typography variant="h6">{transaction.feePercentage}%</Typography>
//                 <Typography variant="h5">Fee Amount</Typography>
//                 <Typography variant="h6">{transaction.fee} {transaction.currency.toUpperCase()}</Typography>
//                 </div>
//             : null} */}