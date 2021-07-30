import { Container, Grid, Card } from "@material-ui/core";
import Twitter from 'components/twitter/twitter';
import { CryptoGraphics } from 'components/cryptoGraphics/cryptoGraphics';
import useStyles from 'styles';

export const HomeGrid = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={12} alignItems="center">
        <Grid item xs={8} alignItems="center">
            <Card elevation={3} className={classes.adminCard}>
              <CryptoGraphics />
            </Card>
        </Grid>
        <Grid item xs={4} >
            <Twitter />
        </Grid>
      </Grid>
    </Container>
  );
};
