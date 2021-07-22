import { useState } from "react";
import { supabase } from "supabase/supabase";

export default function TransactionsPopup() {
  const [transactionType, setTransactionType] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  /* const [error, setError] = useState();
  const [transaction, setTransaction] = useState(); */
  const [kyc, setKyc] = useState(false);

  const aux = window.location.hash;
  console.log(aux);
  const id = aux.slice(1);
  console.log(id);
  const info = async () => {
    console.log("adentro de function async");
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id);

    if (data.length < 1) return setError(true);
    if (data[0]) {
      setTransactionType(data[0].kind);
      return setTransaction(data[0]);
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

  async function handleSubmit() {
    const aux = await supabase
      .from("transactions")
      .update([
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          kyc_verified: true,
        },
      ])
      .eq("id", id);
    setTransaction(aux[0]);
    return setKyc(true);
  }
  return (
    <div>
      <div> Hola </div>

      {!firstName && !lastName && !email && !kyc && (
        <form onSubmit={() => handleSubmit()}>
          {" "}
          <input
            type="text"
            placeholder="firts name"
            onChange={(event) => setFirstName(event)}
          />
          <input
            type="text"
            placeholder="last name"
            onChange={(event) => setLastName(event)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event)}
          />
        </form>
      )}

      <div>
        {" "}
        {transactionType === "deposit" && kyc && (
          <div>
            ACA IRIA EL COMPONENTE DE STRIPE PARA QUE NOS DEPOSITE
          </div>
        )}
        {transactionType === "withdraw" && kyc && (
          <div>
            {" "}
            <div>A que cuenta desea retirar sus fondos?</div>
            <input
              type="text"
              /* onChange={(event) => setBankAccount(event)} */
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}
