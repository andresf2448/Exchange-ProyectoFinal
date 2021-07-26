import { useDeposit } from 'customHooks/useDeposit'
import { Link } from "react-router-dom";
export default function Deposit() {
  

  useDeposit({})
  return (
    <div>
      <div>
        <div>CRIPTO</div>
        <Link
          to={{
            pathname: "/deposit",
            hash: "#crypto",
          }}
        />
        <buttom>Deposit Crypto</buttom>
      </div>
      <div>
        <div>FIAT</div>
        <div>Deposit Fiat</div>
      </div>
      <div>
        <div>STELLAR LUMENS (XLM)</div>
        <div>Buy whith credit card</div>
      </div>
    </div>
  );
}
