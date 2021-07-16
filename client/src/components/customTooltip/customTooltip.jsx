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
                    <Typography varian="h3" >{formatter.format(payload[0]?.value)}</Typography>
                    <Typography variant="p" >{label}</Typography>
                </Grid>
            }
        </Container>
    
    )
}

export default CustomTooltip;
