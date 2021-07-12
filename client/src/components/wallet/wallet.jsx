import {Container, Typography} from '@material-ui/core';
import CreateAccount from '../../methodsWallet/createAccount';
import Orderbook from '../../methodsWallet/orderbook'
/*import ManageBuyOffer from '../../methodsWallet/manageBuyOffer' */


export const Wallet= ()=>{
    return(
        <Container>
            <Typography variant='h3'>soy wallet</Typography>
            <CreateAccount />
            <Orderbook />
            {/* <ManageBuyOffer /> */}
        </Container>
    )
}