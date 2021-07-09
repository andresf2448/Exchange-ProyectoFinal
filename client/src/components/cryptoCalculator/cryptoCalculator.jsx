import {Paper} from '@material-ui/core';
import {useStyles} from 'containers/home/home'

export const CryptoCalculator= () =>{
    const classes = useStyles();
    return(
        <Paper className={classes.root} style={{ height: "20.5rem" }}>
            CRYPTOCALCULATOR
        </Paper>
    )
}