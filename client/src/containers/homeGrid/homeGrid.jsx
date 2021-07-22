import { Container, Grid, Typography } from "@material-ui/core";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
import { Twitter } from 'components/twitter/twitter';


export const HomeGrid = () => {

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
            {/* <CryptoGraphics /> */}
          </Grid>
          <Grid
            container
            className="home-container_boxLeft--bottom"
            spacing={2}
          >
            <Typography variant='h5'>cryptocurrencies and blockchain tweets</Typography>
            <Grid item xs={12}>
              {/* <Twitter /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
