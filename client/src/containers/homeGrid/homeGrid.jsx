import { Container, Grid, Card } from "@material-ui/core";
import Twitter from "components/twitter/twitter";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
import useStyles from "styles";

export const HomeGrid = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" style={{backgroundColor: "#1f1f1f"}}>
      <Grid container alignItems="center">
        <Grid item xs={8} >
          <Card elevation={3} className={classes.backCryptoCard}>
            <CryptoGraphics />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Twitter />
        </Grid>
      </Grid>
    </Container>
  );
};
