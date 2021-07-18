import {CLIENT_SECRET_PAYMENT_INTENT, DELETE_CLIENT_SECRET_PAYMENT_INTENT, WAITING_CLIENT_SECRET_PAYMENT_INTENT} from '../actions/actionsNames'

const initialState = {
    client_secret: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CLIENT_SECRET_PAYMENT_INTENT: 
            return {
                ...state,
                client_secret: action.payload
            }
        
        case DELETE_CLIENT_SECRET_PAYMENT_INTENT:
            return {
                ...state,
                client_secret: null
            }

        case WAITING_CLIENT_SECRET_PAYMENT_INTENT:
            return {
                ...state,
                client_secret: undefined
            }

        default: return state

    }
}
