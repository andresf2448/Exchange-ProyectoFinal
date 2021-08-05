import { Container, Grid, Card } from "@material-ui/core";
import Twitter from "components/twitter/twitter";
import { CryptoGraphics } from "components/cryptoGraphics/cryptoGraphics";
import useStyles from "styles";
import {getBalance, getAccount, profileComplete, getFullBalance} from '../../redux/actions/actions'
import {useDispatch} from 'react-redux'

export const HomeGrid = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  dispatch(getBalance())
  dispatch(getAccount())
  dispatch(profileComplete())
  dispatch(getFullBalance())
  
  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <Card elevation={3} className={classes.backCryptoCard}>
            {/* <CryptoGraphics /> */}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Twitter />
        </Grid>
      </Grid>
    </Container>
  );
};
