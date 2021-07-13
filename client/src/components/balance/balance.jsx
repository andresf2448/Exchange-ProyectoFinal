import {Container, Typography} from '@material-ui/core';
import ManageBuyOffer from '../../methodsWallet/manageBuyOffer.jsx'
export const Balance = ()=>{

    return (
        <Container>
            <Typography variant='h3'>soy balance</Typography>
            <div> <ManageBuyOffer /> </div>
        </Container>
    )
}