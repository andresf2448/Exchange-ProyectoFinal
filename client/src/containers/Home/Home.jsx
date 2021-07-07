import {AppBar, Tabs, Tab, Box, Container, Grid, Paper, makeStyles} from '@material-ui/core';

import './home.scss';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        elevation: '3',
        height: '10rem' 
    },
    text:{
        color:theme.palette.primary.contrastText,
    }
}));


export const Home = () => {
    const classes = useStyles();
    return (
  
        <div>

            <AppBar position="static">
                <Tabs >
                {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"> */}
                    <Tab label="Logo"/>
                    <Tab label="About"/>
                    <Tab label="Other Exchanges"/>
                    <Tab label="Wallet"/>
                    <Tab label="Balance"/>
                    <Tab label="Settings"/>
                    <Tab label="Logout"/>
                </Tabs>
            </AppBar>
           <Box className='user-data'>
                <ul className={classes.text}>
                    <li>USERNAME</li>
                    <li>ACCOUNT</li>
                    <li>BALANCE</li>
                    <li>SOMETHING ELSE...</li>
                </ul>
           </Box>
           <Container maxWidth='xlg' >
                <Grid container className='home-container' xs={12} spacing={2} justifyContent='center' > 
                    <Grid item xs={9} container spacing={2} justifyContent='center'alignContent='space-around'>   
                        <Grid item  className='crypto-graphics' xs={12} >
                            <Paper className={classes.root} >CRYPTOGRAPHICS</Paper>
                        </Grid>
                        <Grid container className='home-container_boxLeft--bottom' xs={12} spacing={2}>
                            <Grid item  className='about'xs={6} >
                                <Paper className={classes.root}>ABOUT</Paper>
                            </Grid>
                            <Grid item  className='statistics' xs={6}>
                                <Paper className={classes.root}>STATISTICS</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item style={{width:'100%'}} className='crypto-calculator' xs={3} >
                            <Paper className={classes.root} style={{height:'20.5rem'}}>CRYPTOCALCULATOR</Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>

        
    )
}