import { Grid, Paper, Typography } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

const  useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 2,
    }      
});

export default function TwittCard(props){
    const {text, username, likes, retweet} = props.data;
    const classes = useStyles();

    return(
        <Grid container item sm={3} className={classes.root}>
            <CardActionArea>
                <Paper elevation={5} className={classes.media}>
                    <Typography item sm={6} className={classes.pos}>
                        {text}
                    </Typography>
                    <Grid item sm={12}>
                    {username}
                    </Grid>
                    <Grid item sm={12}>
                        <Grid item sm={6}>
                        ❤️ {likes}
                        </Grid>
                        <Grid item sm={6}>
                        🔁 {retweet}
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                    <a className='btn btn-primary px-2' href={`https://twitter.com/${props.username}/status/${props.id}`}>
                    See on twitter! </a>
                    </Grid>
                </Paper>
            </CardActionArea>

        </Grid>
    )
}