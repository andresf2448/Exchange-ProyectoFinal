import React, { useState } from 'react';
import { Container, Grid, Typography, Tab, Tabs, Link, AppBar, Button, Card, CardContent, CardActions } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import Faq from 'components/faq/faq';
import { About } from 'components/about/about';


export default function FaqAbout() {
    const [value, setValue] = useState(0);



    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };


    return (<Grid container >

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





{/* <Card style={{width:'200px' ,padding:'20px'}}>
            <CardContent>
                <Typography variant='h4'>
                    FAQ
                </Typography>
                <Typography variant='h5'>
                    Lorem ipsum dolor sit amet. Ducimus numquam eos.
                </Typography>
            </CardContent>
            <CardActions>
            <Button><NavLink to='/faq' style={{textDecoration:'none'}}>Learn more</NavLink></Button>
            </CardActions>
        </Card>
        <Card style={{width:'200px' ,padding:'20px'}}>
            <CardContent>
                <Typography variant='h4'>
                    About
                </Typography>
                <Typography variant='h5'>
                    Lorem ipsum dolor sit amet. Ducimus numquam eos.
                </Typography>
            </CardContent>
            <CardActions>
                <Button><NavLink to='/about' style={{textDecoration:'none'}}>Learn more</NavLink></Button>
            </CardActions>
        </Card> */}