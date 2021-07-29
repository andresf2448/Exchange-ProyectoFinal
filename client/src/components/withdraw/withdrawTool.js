export default function validate(input) {
    let error = {
      isError: false,
      amount: '',
      email: ''
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