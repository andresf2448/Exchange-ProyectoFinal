import {Paper} from '@material-ui/core';
import {useStyles} from 'containers/home/home'

export const CryptoGraphics= ()=>{
    const classes = useStyles();
    return (
            <Paper className={classes.root}>CRYPTOGRAPHICS</Paper>
    )
}