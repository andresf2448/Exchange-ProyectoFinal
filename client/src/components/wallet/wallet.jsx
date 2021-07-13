import {Container} from '@material-ui/core';
import CreateAccount from '../../methodsWallet/createAccount';
import Orderbook from '../../methodsWallet/orderbook'
/*import ManageBuyOffer from '../../methodsWallet/manageBuyOffer' */


export const Wallet= ()=>{
    return(
        <Container>
            <CreateAccount />
            <Orderbook />
            {/* <ManageBuyOffer /> */}
        </Container>
    )
}