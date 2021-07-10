import {Paper} from '@material-ui/core';
import useStyles from 'styles.js';

export const AboutPreview = ()=>{
    const classes = useStyles();

    return (
            <Paper className={classes.root}>ABOUT PREVIEW</Paper>
    )
}