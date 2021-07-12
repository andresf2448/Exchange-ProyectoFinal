// /\S+@\S+\.\S+/
import {supabase} from 'supabase/supabase';

export const takePublicKey = async (mail) => {
        
    let {data, error} = await supabase
    .from('datauser')
    .select('public_key')
    .eq('email', mail )
    if (error) return alert(error.message)
    if (data.length > 0) return data[0].public_key
    else return undefined
}

export const takeSecretKey = async () => {
    let session = supabase.auth.session()
    let {data, error} = await supabase
    .from('wallet')
    .select('secret_key')
    .eq('id_user', session.user.id )
    
    if (error) return alert(error.message)
   return data[0].secret_key

}

export function validate(input) {
    let error = {
        isError: false,
        amount: '',
        email: ''
    }
    let regexEmail = /\S+@\S+\.\S+/
    if (!input.email) {
        error.email = "Email is required"
        error.isError = true
    } else if (!regexEmail.test(input.email)) {
        error.email = "Email is invalid"
        error.isError = true
    }
    if (!input.amount) {
        error.amount = "Amount is necesary"
        error.isError = true
    } else if (input.amount < 0) {
        error.amount = "Amount must be higher than 0"
        error.isError = true
    }
    return error
}