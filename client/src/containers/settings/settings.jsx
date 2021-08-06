import { Grid, Tabs, Tab, AppBar, Card, useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import { LoadingProfile } from "components/loadingProfile/loadingProfile";
import RestorePassword from "components/restorePassword/restorePassword";
import { LoadId } from "components/loadId/loadId";
import useStyles from "styles";

export function Settings() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const ourMediaQuery = useMediaQuery("(min-width:820px)");

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Grid container style={{backgroundColor: '#1f1f1f'}}>
      <Grid item xs={2}>
        <AppBar position="static" className={ourMediaQuery?classes.appBar:classes.appBarResponsive}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            centered={true}
          >
            <Tab label="Profile" className={ourMediaQuery?classes.tabsNormal:classes.tabsResponsive} />
            <Tab label="Identification" className={ourMediaQuery?classes.tabsNormal:classes.tabsResponsive} />
            <Tab label="Change password" className={ourMediaQuery?classes.tabsNormal:classes.tabsResponsive} />
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
