import {Paper} from '@material-ui/core';

import {useStyles} from 'containers/home/home'

export const Statistics = ()=>{
    const classes = useStyles();
    return(
            <Paper className={classes.root}>STATISTICS</Paper>
    )
}