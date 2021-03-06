import {Container, Grid, Typography} from '@material-ui/core';
import useStyles from 'styles';

const CustomTooltip = ({active, payload, label}) => {
    const classes = useStyles();
    
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Container>
            { active === true &&
                <Grid sm={12} className={classes.tooltip}>
                    {payload[0].value &&
                    <Typography variant="h6" >
                        {formatter.format(payload[0].value)}
                    </Typography>
                    }
                    {payload[0].payload.date && 
                    <Typography variant="p" >{payload[0].payload.date}</Typography>
                    }
                </Grid>
            } 
        </Container>
    )
}

export default CustomTooltip;
