import { Container, Typography } from "@material-ui/core";
import { LoadingProfile } from "components/loadingProfile/LoadingProfile";

export function Settings() {
  return (
    <Container>
      <Typography variant="h3">soy settings</Typography>
      <LoadingProfile />
    </Container>
  );
}
