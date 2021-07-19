import { Container, Grid } from "@material-ui/core";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
// import { Twitter } from 'components/twitter/twitter';
// import {AboutPreview} from 'components/aboutPreview/aboutPreview';
// import {Statistics} from 'components/statistics/statistics';
// import {CryptoCalculator} from 'components/cryptoCalculator/cryptoCalculator';

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
            <CryptoGraphics />
          </Grid>
          <Grid
            container
            className="home-container_boxLeft--bottom"
            spacing={2}
          >
            <Grid item xs={12}>
              {/* <Twitter /> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{ width: "100%" }}
          className="crypto-calculator"
          xs={3}
        >
          <CryptoCalculator />
        </Grid>
      </Grid>
    </Container>
  );
};

//    {/* <Grid item style={{ width: "100%" }} className="crypto-calculator" xs={3}>
//                 <CryptoCalculator/>
//             </Grid> */}
