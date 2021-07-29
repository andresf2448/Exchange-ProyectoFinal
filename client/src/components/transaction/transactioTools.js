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

const takeEmails = async () => {
  let {data: emails} = await supabase 
  .from('datauser')
  .select('email')

  return emails
}

export async function validate(input) {
  let error = {
    isError: false,
    amount: '',
    email: ''
  }

  let emails = await takeEmails()
  
  
  
  // let regexEmail = /\S+@\S+\.\S+/
  if (!input.email) {
    error.email = "Email is required"
    error.isError = true
  } else if (!emails.find(mail => mail.email === input.email)) {
    
    error.email = "Email is invalid"
    error.isError = true
  }
  if (!input.amount) {
    error.amount = "Amount is necesary"
    error.isError = true
  } else if (input.currency === 'ARSR' && input.amount < 100) {
    error.amount = "Amount must be at least 100 ARSR"
    error.isError = true
  } else if (input.currency === 'XLM' && input.amount < 1) {
    error.amount = "Amount must be at least 1 XLM"
    error.isError = true
  } else if (input.currency === 'SRT' && input.amount < 1) {
    error.amount = "Amount must be at least 1 SRT"
    error.isError = true
  } else if (input.amount < 10) {
    error.amount = `Amount must be at least 10 ${input.currency}`
    error.isError = true
  } 
  return error
}
