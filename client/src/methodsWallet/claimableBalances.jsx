import ClaimBalance from "./claimClamableBalance";
import CreateClaimableBalance from "./createClamableBalance";
import { Container } from "@material-ui/core";


export default function ClaimableBalances({ secretKey, publicKey, assets }) {

  return (
    <Container >
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
    </Container>
    
  );
}
