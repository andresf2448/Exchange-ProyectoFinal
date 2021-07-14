import {Container, Typography} from '@material-ui/core';
import CryptoChart from 'components/cryptoChart/cryptoChart';

export const About = ()=>{

    return (
        <Container>
            <Typography variant='h3'>soy about</Typography>
            <CryptoChart />
        </Container>
    )
}