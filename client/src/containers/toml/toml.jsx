import { useEffect, useState } from "react";
import axios from "axios";

const Toml = () => {

  const [toml, setToml] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/.well-known/stellar.toml").then((res) => {
      setToml(res.data);
    });
  }, []);
  return <>{toml && toml}</>;
};

export default Toml;
