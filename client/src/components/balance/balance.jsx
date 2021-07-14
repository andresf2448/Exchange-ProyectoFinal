import {Container, Typography} from '@material-ui/core';
import ManageBuyOffer from '../../methodsWallet/manageBuyOffer.jsx'
import BalanceAccount from '../../methodsWallet/balanceAccount'


export const Balance = ()=>{

    return (
        <Container>
            <Typography variant='h3'>soy balance</Typography>
             <ManageBuyOffer />
            <BalanceAccount />
        </Container>
    )
}