import { CLIENT_SECRET_PAYMENT_INTENT, DELETE_CLIENT_SECRET_PAYMENT_INTENT, WAITING_CLIENT_SECRET_PAYMENT_INTENT} from './actionsNames'
import axios from 'axios'


export function getClientSecret(payload) {
    return async function(dispatch) {
        try {
            let paymentIntent = await axios.post('http://localhost:3001/create-payment-intent', payload)
              dispatch({
                type: CLIENT_SECRET_PAYMENT_INTENT,
                payload: paymentIntent.data.clientSecret, 
              })
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
}

export function deleteClientSecret() {
    return {
        type: DELETE_CLIENT_SECRET_PAYMENT_INTENT
    }
}

export function waitingClientSecret() {
    return {
        type: WAITING_CLIENT_SECRET_PAYMENT_INTENT
    }
}
