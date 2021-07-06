import {Button, AppBar, Tabs, Tab, TabPanel, Box, Container, Grid, Card} from '@material-ui/core';

import './Home.scss';

// const useStyles = makeStyles({
//     root: {
        
//     }
// });


export const Home = () => {
    return (
  

        <Box>
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
{/* <TabPanel value={value} index={0}>
  Item One
</TabPanel>
<TabPanel value={value} index={1}>
  Item Two
</TabPanel>
<TabPanel value={value} index={2}>
  Item Three
</TabPanel> */}
           <Box className='user-data'>
                <ul>
                    <li>UserName</li>
                    <li>Cuenta</li>
                    <li>Saldo</li>
                    <li>otra cosa</li>
                </ul>
           </Box>
           
            <Grid container className='home-container' >
                <Grid container xs={9} >   
                    <Container item style={{backgroundColor:'#301B3F'}} className='crypto-graphics'xs={12} >
                        <Card style={{alignItems:'center'}}>CryptoGraphics</Card>
                    </Container>
                    <Grid container className='home-container_boxLeft--bottom' xs={12}>
                        <Grid item style={{backgroundColor:'#301B3F'}} className='about'xs={6}>
                            <h3>ABOUT</h3>
                        </Grid>
                        <Grid item style={{backgroundColor:'#301B3F'}} className='statistics' xs={6}>
                            <h3>STATISTICS</h3>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container className='home-container_boxRight' xs={3}>
                    <Grid item style={{backgroundColor:'#301B3F'}} className='crypto-calculator' color='primary'>
                        <h3>CryptoCalculator</h3>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        
    )
}


// <Box className='user-data'>
//                 <ul>
//                     <li>UserName</li>
//                     <li>Cuenta</li>
//                     <li>Saldo</li>
//                     <li>otra cosa</li>
//                 </ul>
//             </Box>
//             <Box className='home-container'>
//                 <Box className='home-container_boxLeft'>
//                     <Box className='crypto-graphics'>
//                         <h3>CryptoGraphics</h3>
//                     </Box>
//                     <Box className='home-container_boxLeft--bottom'>
//                         <Box className='about'>
//                             <h3>ABOUT</h3>
//                         </Box>
//                         <Box className='statistics'>
//                             <h3>STATISTICS</h3>
//                         </Box>
//                     </Box>
//                 </Box>
//                 <Box className='home-container_boxRight'>
//                     <Box className='crypto-calculator'>
//                         <h3>CryptoCalculator</h3>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>