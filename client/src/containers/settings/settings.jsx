import { Grid, Tabs, Tab, AppBar, Card } from "@material-ui/core";
import { useState } from "react";
import { LoadingProfile } from "components/loadingProfile/loadingProfile";
import RestorePassword from "components/restorePassword/restorePassword";
import { LoadId } from "components/loadId/loadId";
import useStyles from "styles";

export function Settings() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid item xs={2}>
        <AppBar position="static" style={{ height: "87vh" }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            centered={true}
          >
            <Tab label="Profile" />
            <Tab label="Identification" />
            <Tab label="Change password" />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={10}>
        <Card elevation={3} className={classes.cardContainer}>
          {value === 0 && <LoadingProfile />}
          {value === 1 && <LoadId />}
          {value === 2 && <RestorePassword />}
        </Card>
      </Grid>
    </Grid>
  );
}
