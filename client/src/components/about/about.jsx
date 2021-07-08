import {Paper} from '@material-ui/core';
import {useStyles} from 'containers/home/home'

export const About = ()=>{
    const classes = useStyles();

    return (
            <Paper className={classes.root}>ABOUT</Paper>
    )
}