import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'

import './stripeCard.css'

export default function StripeCard() {
    

    return (
        <div className='cardStripeContainer'>
            Card details
            <CardElement className='StripeElement' />
        </div>
    )
}


