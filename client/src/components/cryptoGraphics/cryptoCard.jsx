import { Card, Typography, Grid } from "@material-ui/core";
import CryptoChart from 'components/cryptoChart/cryptoChart';
import useStyles from "styles.js";
import SkewLoader from "react-spinners/SkewLoader";
import 'components/cryptoGraphics/cryptoGraphics.css';

const CryptoCard = (props) => {
  const { symbol, img, price, color} = props;

  const classes = useStyles();
  return (
    <>
        <Card className={classes.cryptoCurrency}>
                <Grid container>
                  <Grid item sm={4} >
                    <img className="cryptoIcons" src={img} alt="no img" />
                  </Grid>
                  <Grid item sm={6}>
                    <Typography variant="h5" className="coinSymbol"> {symbol} </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="h5" className={color}>
                      {price ? `$ ${price}` : <SkewLoader size={10} />}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item sm={12} className={classes.cryptoChart} >
                    <CryptoChart crypto={symbol} />
                </Grid>
        </Card>
    </>
  );
};

export default CryptoCard;