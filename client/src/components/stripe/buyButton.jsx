import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getClientSecret, waitingClientSecret } from 'redux/actions/actions'
import {Button} from '@material-ui/core'

export default function BuyButton({convertion, result}) {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const handleBuy = () => {
        dispatch(waitingClientSecret())
        dispatch(getClientSecret({currency: convertion.firstCoin, amount: convertion.amount}))
        history.push('/stripe')
    }

    return (
        <Button 
        onClick={handleBuy} 
        fullWidth={true} 
        variant="contained"
        color='primary'
        // disabled={convertion.amount === 0 || convertion.amount === '' || convertion.firstCoin === '' || convertion.firstCoin === 'BTC' || convertion.firstCoin === 'ETH' }
        disabled={!result || convertion.amount === 0 || convertion.amount === '' || (convertion.secondCoin !== 'BTC' && convertion.secondCoin !== 'ETH')}
        >
            Buy
        </Button>
    )
}
