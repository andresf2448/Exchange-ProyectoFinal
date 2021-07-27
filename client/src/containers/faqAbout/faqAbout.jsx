import React, { useState } from 'react';
import {  Grid,  Tab, Tabs,  AppBar} from '@material-ui/core'
import Faq from 'components/faq/faq';
import About  from 'components/about/about';


export default function FaqAbout() {
    const [value, setValue] = useState(0);



    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
    <Grid container style={{backgroundColor: '#1F1F1F'}} >
        <Grid item xs={2}>

            <AppBar position="static" style={{marginLeft:'20px'}}>
                <Tabs value={value} orientation='vertical' variant='scrollable' onChange={handleChange}>
                    <Tab label='FAQ' />
                    <Tab label="About" />

                </Tabs>
            </AppBar>
        </Grid>
        <Grid item xs={10}>
            {value === 0 && <Faq />}
            {value === 1 && <About />}
        </Grid>


    </Grid>)
}





