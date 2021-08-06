import { Container, Grid, Card } from "@material-ui/core";
import Twitter from "components/twitter/twitter";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
import useStyles from "styles";

export const HomeGrid = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <Card elevation={3} className={classes.backCryptoCard}>
            {/* <CryptoGraphics /> */}
          </Card>
        </Grid>
        <Grid item xs={3}>
          {/* <Twitter /> */}
        </Grid>
      </Grid>
    </Container>
  );
};
