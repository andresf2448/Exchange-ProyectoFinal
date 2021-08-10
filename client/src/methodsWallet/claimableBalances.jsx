import ClaimBalance from "./claimClaimableBalance";
import CreateClaimableBalance from "./createClamableBalance";
import { Container } from "@material-ui/core";
import GetClaimableBalances from "./getClaimableBalances";

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
      <GetClaimableBalances 
        publicKey={publicKey}
        />
    </Container>
  );
}
