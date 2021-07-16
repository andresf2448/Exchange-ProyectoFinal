import {Container} from '@material-ui/core';
import ManageBuyOffer from '../../methodsWallet/manageBuyOffer.jsx'
// import BalanceAccount from '../../methodsWallet/balanceAccount'
import Orderbook from 'methodsWallet/orderbook.jsx';
import TradingView from 'components/tradingView/tradingView.jsx';

export const Balance = ()=>{

    return (
        <Container>
            <ManageBuyOffer />
            <Orderbook />
        </Container>
    )
}
