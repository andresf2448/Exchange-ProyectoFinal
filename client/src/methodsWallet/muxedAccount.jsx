import React, { useState } from 'react';
import { Button, List, ListItem, Container, Typography, Paper, Grid, Divider } from "@material-ui/core";
import Grow from '@material-ui/core/Grow';
import useStyles from "styles";
import { supabase } from "supabase/supabase";
import StellarSdk from 'stellar-sdk';


export default function MuxedAccount ( props ) {
    const [mux, setMux] = useState();
    const [muxedAccounts, setMuxedAccounts] = useState([]);
    const classes = useStyles();
    const publicKeyUser = props.pk;
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
    const session = supabase.auth.session();
    let newMuxedAccount; 
    let Rand;
    
    const idMAGenerator = () => {
        const min = 1;
        const max = 99;
        const aux = min + Math.random() * (max - min);
        Rand = aux.toFixed().toString();
        return;
    }

    const createMuxedAccount = async (event) => {
        idMAGenerator();
        event.preventDefault();
        const userAccount = await server.loadAccount(publicKeyUser);
        newMuxedAccount = await new StellarSdk.MuxedAccount(userAccount, Rand); // ver
        let maData = {
            muxedPublicKey: newMuxedAccount._mAddress, 
            muxedSequence: newMuxedAccount.account.sequence
        }
        setMux(maData);
        updateMuxedAccount();
    };
    
    const getMuxedAccount = async (event) => {
        event.preventDefault();
        let info = await supabase
        .from('muxedAccounts')
        .select('*')
        .eq('id_user', session.user.id)
        setMuxedAccounts(info.data)
    }
        
        
    const updateMuxedAccount = async () => {
        let info = await supabase // eslint-disable-line no-unused-vars
        .from('muxedAccounts')
        .insert([
            {   
                id_user: session.user.id,
                muxed: newMuxedAccount._mAddress, 
                idMuxedAccount: Rand 
            }
        ])
    }

    return(
        <Container>
            <form onSubmit={createMuxedAccount}>
                <Button className={classes.button} color="secondary" type="submit">
                    Create a muxed account
                </Button>
            </form> 
            <br/>
                {
                    mux &&
                    <Grow container in='true' timeout='auto'>
                        <Grid container  spacing={2}>
                            <Grid item xs={12}>
                                <Paper className={classes.cryptoCurrency} elevation={10}>
                                    <Typography variant='h5'>
                                        {mux.muxedPublicKey}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.cryptoCurrency} elevation={10}>
                                    <Typography variant='h5'>
                                        Base account sequence: {mux.muxedSequence}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grow>
                }
            <br/>
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Button className={classes.buttom} color="secondary" type="submit" onClick={getMuxedAccount}>
                    Get your muxed accounts
                </Button>

                <Grid item xs={12}>
                    { 
                        muxedAccounts.length > 0 &&
                        muxedAccounts.map(account => (
                            <Grow container in='true' timeout='auto'>
                                <List >
                                    <Paper elevation={10} className={classes.cryptoCurrency}>
                                        <ListItem id={account.id}>
                                            <Typography variant='h5'> id {account.idMuxedAccount} </Typography>
                                            <Divider variant="middle" orientation="vertical" flexItem/>
                                            <Typography variant='h5'> Muxed Public Key {account.muxed} </Typography>
                                        </ListItem>
                                    </Paper>
                                </List>
                            </Grow>
                        ))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}
