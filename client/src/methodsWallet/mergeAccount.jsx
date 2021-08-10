import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import StellarSdk from "stellar-sdk";
import Swal from "sweetalert2";
import axios from "axios";
import { supabase } from "supabase/supabase";

export default function MergeAccount({ publicKey, secretKey }) {
  const [accountDestination, setAccountDestination] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const [newAccount, setNewAccount] = useState({
    publicKey: false,
    secretKey: false,
  });
  const session = supabase.auth.session();

  const createAccount = async () => {
    const response = await axios.get("http://localhost:3001/createWallet");
    const { publicKey, secretKey } = response.data;
    return setNewAccount({ publicKey, secretKey });
  };

  const merge = async () => {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
    const [
      {
        max_fee: { mode: fee },
      },
      account,
    ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);

    if (account.balances?.length > 1) {
      return Swal.fire({
        text: "The account source have more than 1 asset in balance, please send all tokens except XLM to account destination and delete trust lines for all assets",
        icon: "error",
        confirmButtonText: "Ok!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
    if (
      account.balances?.length === 1 &&
      account.balances[0].asset_type !== "native"
    ) {
      return Swal.fire({
        text: "You need have XLM in balance for this operation",
        icon: "error",
        confirmButtonText: "Ok!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })

      .addOperation(
        StellarSdk.Operation.accountMerge({
          destination: accountDestination,
        })
      )
      .setTimeout(0)
      .build();

    transaction.sign(sourceKeypair);
    server.submitTransaction(transaction).then(async (response) => {
      await supabase
        .from("datauser")
        .update([
          {
            public_key: newAccount.secretKey,
          },
        ])
        .eq("id_user", session.user.id);

      await supabase
        .from("wallet")
        .update([
          {
            secret_key: newAccount.secretKey,
          },
        ])
        .eq("id_user", session.user.id);

      Swal.fire({
        text: `Account Muxed! Operation ID: ${response.id}`,
        icon: "success",
        confirmButtonText: "Ok!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    merge();
  }
  return (
    <div>
      <p></p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          variant="standard"
          value={accountDestination}
          type="text"
          onChange={(event) => setAccountDestination(event.target.value)}
          placeholder="Account destination"
          inputProps={{ style: { textAlign: "center" } }}
        />
        <Button
          type="submit"
          disabled={accountDestination?.length === 56 ? false : true}
        >
          Submit
        </Button>
      </form>
      <p>
        No tenes una cuenta valida? Crea una:{" "}
        <Button type="text" onClick={() => createAccount()}>
          Create
        </Button>
      </p>
      {newAccount.publicKey ? (
        <p>
          Insert this Public Key: {newAccount.publicKey}. Your new secret key:{" "}
          {newAccount.secretKey}
        </p>
      ) : null}
    </div>
  );
}
