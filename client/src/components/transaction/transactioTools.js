// /\S+@\S+\.\S+/
import { supabase } from 'supabase/supabase';
import Swal from 'sweetalert2'

export const takereceiverId = async (mail) => {
        
    let {data, error} = await supabase
    .from('datauser')
    .select('id_user')
    .eq('email', mail )
    if (error) return Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Cool',
      background: '#1f1f1f',
      confirmButtonColor: 'rgb(158, 158, 158)',
    });
    if (data.length > 0) return data[0].id_user
    else return undefined
}

export const takeSourceId = async () => {
    let session = supabase.auth.session()
    return session.user.id 

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
