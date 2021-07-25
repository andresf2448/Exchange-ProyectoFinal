import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
import useStyles from "styles";

const Toml = () => {
  const classes = useStyles();

  const [toml, setToml] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/stellar.toml").then((res) => {
      setToml(res.data);
    });
  }, []);
  return <>{toml && toml}</>;
};

export default Toml;
