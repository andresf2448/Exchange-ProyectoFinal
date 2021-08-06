import { Container, Grid, Card, useMediaQuery } from "@material-ui/core";
import Twitter from "components/twitter/twitter";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
import useStyles from "styles";
import {
  getBalance,
  getAccount,
  profileComplete,
  getFullBalance,
} from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export const HomeGrid = () => {
  const ourMediaQuery = useMediaQuery("(min-width:730px)");
  const classes = useStyles();

  const dispatch = useDispatch();

  dispatch(getBalance());
  dispatch(getAccount());
  dispatch(profileComplete());
  dispatch(getFullBalance());

  return (
    <Container maxWidth="lg" style={{ backgroundColor: "#1f1f1f" }}>
      {ourMediaQuery ? (
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Card elevation={3} className={classes.backCryptoCard}>
              <CryptoGraphics />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Twitter />
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} alignItems="center" direction="column">
            <Card elevation={3} className={classes.backCryptoCard}>
              <CryptoGraphics />
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
