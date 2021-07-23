import { useState } from "react";
import { useDispatch } from "react-redux";
import { getClientSecret } from "redux/actions/actions";
import { supabase } from "supabase/supabase";
import CheckoutForm from '../components/stripe/checkoutForm'

export default function TransactionsPopup() {

  const dispatch = useDispatch()

  const [transactionType, setTransactionType] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [email, setEmail] = useState();
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currency: '',
    amount: ''
  })
   const [ error, setError] = useState();
  /*const [transaction, setTransaction] = useState(); */
  const [kyc, setKyc] = useState(false);

  const aux = window.location.hash;
  
  const id = aux.slice(1);
  
  const info = async () => {
    
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id);
    console.log('El errorrrrrrr', error)
    console.log('Dataaaaaa', data)
    if (error) return setError(true);
    if (data[0]) {
      console.log('La dataaaaaaaa', data[0].kind)
      return setTransactionType(data[0].kind);
    }
  };
  info();

  /* const { data } = supabase
    .from(`transactions:id=eq.${id}`)
    .on("kyc_verified", (payload) => {
      console.log("Change received!", payload);
      if (data[0].kyc_verified === true) return setKyc(true);
    })
    .subscribe(); */

    const getPublicKey = async () => {
      const { data, error } = await supabase
      .from('datauser')
      .select('public_key')
      .eq('id_user', id)

      if(error) return error
      return data
    }

  async function handleSubmit(event) {
    event.preventDefault()
    let data = await getPublicKey()
    if(data[0].public_key) {
      let supa = await supabase
        .from("transactions")
        .insert([
          {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            amount_in: input.amount,
            kyc_verified: true,
            id: id,
            account_id: data[0].public_key
          }
        ])
        // .match("id", id);
        console.log('Supaaaaa', supa)
        dispatch(getClientSecret({currency: input.currency, amount: input.amount}))
      
      setKyc(true);

    } else {
      setError(data)
    }
  }
  console.log('Transaction type', transactionType)
  return (
    <div>
      <div> Hola </div>

      {!kyc && (
        <form onSubmit={handleSubmit}>
         
          <input
            type="text"
            placeholder="firts name"
            name="firtsName"
            onChange={(event) => setInput({...input, [event.target.name]: event.target.value})}
          />
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            onChange={(event) => setInput({...input, [event.target.name]: event.target.value})}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(event) => setInput({...input, [event.target.name]: event.target.value})}
          />
          <input
            type="text"
            placeholder="currency"
            name="currency"
            onChange={(event) => setInput({...input, [event.target.name]: event.target.value})}
          />
          <input
            type="text"
            placeholder="amount"
            name="amount"
            onChange={(event) => setInput({...input, [event.target.name]: event.target.value})}
          />
          <input
            type="submit"
            value='Send'
            // onChange={(event) => setEmail(event)}
          />
        </form>
      )}

      <div>
       
        {transactionType === "deposit" && kyc && (
          <div>
            <CheckoutForm/>
          </div>
        )}
        {transactionType === "withdraw" && kyc && (
          <div>
            
            <div>A que cuenta desea retirar sus fondos?</div>
            <input
              type="text"
              /* onChange={(event) => setBankAccount(event)} */
            />
          </div>
        )}
      </div>
    </div>
  );
}
