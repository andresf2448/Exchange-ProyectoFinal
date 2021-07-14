import { Grid, Card } from "@material-ui/core";
import useStyles from "styles.js";
import SkewLoader from "react-spinners/SkewLoader";

const CryptoCard = (props) => {
  const { symbol, img, price, color} = props;

  const classes = useStyles();
  return (
    <>
      <Grid item sm={12}>
        <Card className={classes.cryptoCurrency}>
          <Grid item sm={3}>
            <img className="cryptoIcons" src={img} alt="no img" />
          </Grid>
          <Grid item sm={3}>
            <h2 className="coinSymbol"> {symbol} </h2>
          </Grid>
          <Grid item sm={3}>
            <h3 className={color}>
              {price ? `$ ${price}` : <SkewLoader size={10} />}{" "}
            </h3>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default CryptoCard;