import React, { useState} from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Grid, Container } from '@material-ui/core'

export default function TradingView() {
    const [currency, setCurrency] = useState('BTCUSDT')
   
    return (
        <Container>
            <Grid container>
                <Grid item sm={4} >
                    <TradingViewWidget symbol={currency} theme={Themes.DARK}/>
                </Grid>
                

            </Grid>
        </Container>
    )
}

{/* <Grid item sm={1} justifyContent='flex-start'>
<select onChange={(e) => { setCurrency(e.target.value) }}>
<option value="BTCUSDT">BTC/USDT</option>
<option value="ETHUSDT">ETH/USDT</option>
<option value="ADAUSDT">ADA/USDT</option>

</select>
</Grid> */}


//     new tradingView.widget(
//         {
//             "width": 980,
//             "height": 610,
//             "symbol": {symbol},
//             "interval": "D",
//             "timezone": "Etc/UTC",
//             "theme": "light",
//             "style": "1",
//             "locale": "in",
//             "toolbar_bg": "#f1f3f6",
//             "enable_publishing": false,
//             "allow_symbol_change": true,
//             "container_id": "tradingview_8580c"
//         }
//     );
// }