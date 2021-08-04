import React, { useState } from 'react';
import { useMediaQuery, Grid,  Tab, Tabs,  AppBar} from '@material-ui/core'
import Faq from 'components/faq/faq';
import About  from 'components/about/about';
import useStyles from "styles";

export default function FaqAbout() {
    const [value, setValue] = useState(0);
    const ourMediaQuery = useMediaQuery("(min-width:820px)");
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
    <Grid container style={{backgroundColor: '#1f1f1f'}} >
        <Grid item xs={2}>

            <AppBar position="static" className={ourMediaQuery?classes.appBar:classes.appBarResponsive}>
                <Tabs value={value} orientation='vertical' variant='scrollable' onChange={handleChange}>
                    <Tab label='FAQ' className={ourMediaQuery?classes.tabsNormal:classes.tabsResponsive} />
                    <Tab label="About" className={ourMediaQuery?classes.tabsNormal:classes.tabsResponsive} />

                </Tabs>
            </AppBar>
        </Grid>
        <Grid item xs={10}>
            {value === 0 && <Faq />}
            {value === 1 && <About />}
        </Grid>


    </Grid>)
}





