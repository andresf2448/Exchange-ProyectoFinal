import {Badge, Container, Grid} from '@material-ui/core';
import useStyles from 'styles.js';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

export const ShowUserData= () =>{
    const classes = useStyles();
    return(
        <Container>
            <Grid container >
                <Badge className={classes.badge}>
                    <DirectionsRunIcon/>
                </Badge>
                <Badge className={classes.badge}>
                    USERNAME
                </Badge>
                <Badge className={classes.badge}>
                    ACCOUNT
                </Badge>
                <Badge className={classes.badge}>
                    BALANCE
                </Badge>
                <Badge className={classes.badge}>
                    SOMETHING ELSE...
                </Badge>    
            </Grid>

        
        </Container>
    )
}