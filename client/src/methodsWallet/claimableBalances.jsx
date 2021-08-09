import ClaimBalance from "./claimClaimableBalance";
import CreateClaimableBalance from "./createClamableBalance";
import GetClaimableBalances from "./getClaimableBalances";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

}));

export default function ClaimableBalances({ secretKey, publicKey, assets }) {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <CreateClaimableBalance
        secretKey={secretKey}
        publicKey={publicKey}
        assets={assets}
      />
      <ClaimBalance
        secretKey={secretKey}
        publicKey={publicKey}
        assets={assets}
      />
      <GetClaimableBalances 
        publicKey={publicKey}
      />
    </section>
    
  );
}
