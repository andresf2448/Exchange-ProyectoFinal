import { Container, Typography, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
//import useStyles from "styles";
import { NavLink } from "react-router-dom";

export default function About () {
  //const classes = useStyles();

  return (
    <Container>
      <NavLink to="/home">
        <Button color="secondary">
          <HomeIcon fontSize="large" />
        </Button>
      </NavLink>
      <Typography variant="h3">soy about</Typography>
    </Container>
  );
};
