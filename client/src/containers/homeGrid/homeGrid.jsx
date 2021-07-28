import { Container, Grid, Card } from "@material-ui/core";
import Twitter from 'components/twitter/twitter';
// import { CryptoGraphics } from 'components/cryptoGraphics/cryptoGraphics';
import useStyles from 'styles';

export const HomeGrid = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        className="home-container"
        spacing={2}
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          container
          spacing={2}
          justifyContent="center"
          alignContent="space-around"
        >
          <Grid item className="crypto-graphics" xs={12}>
            <Card elevation={3} className={classes.adminCard}>
              {/* <CryptoGraphics /> */}
            </Card>
          </Grid>
          <Grid
            container
            className="home-container_boxLeft--bottom"
            spacing={2}
          >
            <Grid item xs={12}>
              <Twitter />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
