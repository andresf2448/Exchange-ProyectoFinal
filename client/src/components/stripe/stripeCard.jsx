import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'

import './stripeCard.css'

export default function StripeCard() {
    

    return (
        <div className='cardStripeContainer'>
            <h1>Card details</h1>
            <CardElement className='StripeElement' />
        </div>
    )
}


