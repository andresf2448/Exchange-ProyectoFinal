import React, { useState, useEffect} from 'react'
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import useStyles from 'styles.js'
import { supabase } from 'supabase/supabase'

export default function Faq() {
    const [fee, setFee] = useState('loading')
    useEffect(()=>{
        feeCommision();
    }, [])
    

    async function feeCommision(){

        const {data} = await supabase
        .from('commsion_server')
        .select('*')        
        setFee(data[data.length - 1].percentage);
    }


    // let amount_fee = parseFloat(amount) * (data[data.length - 1].percentage / 100)
    const classes = useStyles();
    return (
        <Container style={{ width: '90%' }}>

            {/* <Grid container sm={12} >
                <Grid imte sm={6}>
                    <NavLink to='/home'><Button color='secondary'><HomeIcon fontSize='large' /></Button></NavLink>
                </Grid>
                <Grid imte sm={6}>
                    <Typography variant='h4' className={classes.text} >FAQ</Typography>
                </Grid>
            </Grid> */}
            
            <Typography variant='h5' className={classes.textAbout}>About us</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6' >What is RocketXChange?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        RocketXchange is a digital trading platform. With it, anyone can access to buy and sell crypto and fiat in a simple and secure way.
                        In RocketXchange you can deposit and withdraw dollars, euros, argentine pesos, ethereums, lummens (among others), and carry out buying and selling operations just a couple of clicks away.
                    </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>How does RocketXChange work?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>RocketXchange uses tokens for all its operations. These are secure representations of the assets on deposit. which means that by depositing 5 US dollars, the user will obtain 5 US dollar tokens (less commission), ready to operate within the platform. These USD tokens can be converted back to US dollars (or any other currency) and withdrawn whenever the user wishes. In addition, RocketXchange works together with the Stellar network, to give the user the ability to interact with different currencies and markets.</Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>How could I communicate with a representative of the platform?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>You can communicate with us through rocketexchange1@gmail.com</Typography>
                </AccordionDetails>

            </Accordion>


            <Typography variant='h5' className={classes.textAbout}>Cryptocurrency Exchange</Typography>


            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>How fast will my transaction be processed?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Each transactions takes 5-7 seconds to be processed</Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>What is the minimal exchange amount on RocketXChange?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>The minimum amount of any operation is 1 dollar</Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>Do I need to register to use RocketXChange?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Yes, registration is mandatory to be able to operate into the platform. Takes only a few minutes!</Typography>
                </AccordionDetails>

            </Accordion>
            <Typography variant='h5' className={classes.textAbout}>Buy crypto with Fiat</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>Can I buy cryptocurrency with fiat through RocketXChange?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Yes, you can buy many cryptocurrencies with fiat money like dollar or euro</Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant='h6'>What fees are there for purchasing crypto with USD/EUR on RocketXChange?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{`All operations within the platform will have a ${fee}% of fee`}</Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    {/* <Typography variant='h6'>What card can i use to buy crypto on RocketXChange?</Typography> */}
                    <Typography variant='h6'>Can I transfer between two RocketExchange accounts?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Yes, you can transfer both types of currencies (crypto and fiat) to any user, you will need only his email </Typography>
                </AccordionDetails>

            </Accordion>

        </Container>
    )
}

