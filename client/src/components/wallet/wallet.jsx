import {Container, Typography} from '@material-ui/core';
import  CreateAccount  from '../../methodsWallet/createAccount';

export const Wallet= ()=>{
    return(
        <Container>
            <Typography variant='h3'>soy wallet</Typography>
            <CreateAccount />
        </Container>
    )
}