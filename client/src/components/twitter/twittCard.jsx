import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

const  useStyles = makeStyles({
    base: {
      width: '100%',
      margin: 'auto',
      padding: 40,
      justifyContent: 'justify',
      alignItems: "center",
      justify:"center"
    },
    paper: {
      height: 260,
      paddingTop: 20,
      justifyContent:"justify",
    },
    content: {
        padding: 10,
        fontSize: 16,
        textAlign: "justify",
    },  
    link: {
        color: '#1DA1F2',
        margin: 2,
        letterSpacing: 3
    },
    userMetrics: {
        display: "contents",
        fontSize: 16,
    },
    user: {
        fontWeight: 'bold', 
    }, 
    publicMetrics: {
        margin: 5,
        justifyContent: 'center',
        display: 'flex',
        direction: 'row',
        textAlign: 'center',
        fontWeight: 'bold'
    }    
});

export default function TwittCard(props) {
    const { text, username, likes, retweet, id } = props.data;
    const classes = useStyles();

    return(
        <Grow container in='true' timeout='auto'>
            <Grid item sm={3} className={classes.base} spacing={2}>
                <Paper container sm={12} elevation={4} variant="outlined" className={classes.paper}>
                    <Typography item sm={4} className={classes.content}>
                            {text}...
                    </Typography>
                    <Button item sm={4} className={classes.link} href={`https://twitter.com/${username}/status/${id}`}>
                                See on twitter 
                    </Button>
                    <Grid item sm={4} className={classes.userMetrics}>
                        <Typography  className={classes.user}>
                            {username}
                        </Typography >
                        <Grid className={classes.publicMetrics}>
                            <Grid item>
                                ❤️{likes}
                            </Grid>
                            <Grid item>
                                🔁{retweet}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grow>
    )
}