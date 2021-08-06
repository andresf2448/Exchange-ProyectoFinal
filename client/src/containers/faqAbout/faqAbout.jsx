import React, { useState } from 'react';
import { useMediaQuery, Grid,  Tab, Tabs,  AppBar} from '@material-ui/core'
import Faq from 'components/faq/faq';
import About  from 'components/about/about';
// import useStyles from "styles";

export default function FaqAbout() {
    const [value, setValue] = useState(0);
    const ourMediaQuery = useMediaQuery("(min-width:820px)");
    // const classes = useStyles();

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
    <Grid container  style={ourMediaQuery ? {backgroundColor: '#1f1f1f', height:'100%'} : {backgroundColor: '#1f1f1f', justifyContent:'center', height:'100%'}} >
        <Grid item xs={12} sm={2} >

            <AppBar position="static" style={ourMediaQuery ? {} : {width:'70%', marginLeft:'15.5%'}} >
                <Tabs value={value} orientation={ourMediaQuery ? 'vertical':'horizontal'} centered='true' ariant='scrollable' onChange={handleChange}>
                    <Tab label='FAQ'  />
                    <Tab label="About"  />

                </Tabs>
            </AppBar>
        </Grid>
        <Grid item  xs={10} style={{height:'100%', backgroundColor: '#1f1f1f'}}>
            {value === 0 && <Faq />}
            {value === 1 && <About />}
        </Grid>


    </Grid>)
}





