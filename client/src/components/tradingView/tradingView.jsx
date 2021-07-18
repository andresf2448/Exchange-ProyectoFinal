import React, { useState} from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

export default function TradingView() {
    const [currency, setCurrency] = useState('BTCUSDT')
    
    
    
    
    return (
                    <TradingViewWidget symbol={currency} theme={Themes.DARK}/>           
    )
}
