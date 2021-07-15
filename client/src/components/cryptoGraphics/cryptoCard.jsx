import { Card, Typography } from "@material-ui/core";
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
                <div>
                  <div className="cryptoInfo">
                    <img className="cryptoIcons" src={img} alt="no img" />
                    <Typography variant="h5" className="coinSymbol"> {symbol} </Typography>
                  </div>
                    <h3 className={color}>
                      {price ? `$ ${price}` : <SkewLoader size={10} />}{" "}
                    </h3>
                </div>
                <div className={classes.cryptoChart} >
                    <CryptoChart crypto={symbol} />
                </div>
        </Card>
    </>
  );
};

export default CryptoCard;