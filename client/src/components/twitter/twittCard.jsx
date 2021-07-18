import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

const  useStyles = makeStyles({
    root: {
      width: '100%',
      height: '100%',
      margin: 'auto',
      padding: '40px',
      justifyContent: 'justify',
      alignItems: "center",
      justify:"center"
    },
    paper: {
      height: 250,
      paddingTop: 20,
      justifyContent:"justify",
    },
    content: {
        padding: 5,
        fontSize: 18,
        textAlign: "justify",
    },  
    link: {
        margin: 4,
        color: '#1DA1F2'
    },
    userMetrics: {
        fontSize: 18,
        bottom: 0,
    },
    user: {
        fontWeight: 'bold', 
        marginBottom: 5
    }, 
    publicMetrics: {
        textAlign: 'center',
        direction: 'row',
        fontWeight: 'bold',
        margin: 5,
    }    
});

export default function TwittCard(props) {
    const { text, username, likes, retweet, id } = props.data;
    const classes = useStyles();

    return(
        <Grow container in='true' timeout='auto'>
            <Grid item sm={3} className={classes.root} spacing={2}>
                <Paper container sm={12} elevation={4} variant="outlined" className={classes.paper}>
                    <Typography item sm={6} className={classes.content}>
                            {text}...
                            <Button item sm={12} className={classes.link} href={`https://twitter.com/${username}/status/${id}`}>
                                See on twitter 
                            </Button>
                    </Typography>
                    <Grid className={classes.userMetrics}>
                        <Typography  className={classes.user}>
                            {username}
                        </Typography >
                        <Grid container sm={12} className={classes.publicMetrics}>
                            <Grid item sm={6}>
                                ❤️ {likes}
                            </Grid>
                            <Grid item sm={6}>
                                🔁 {retweet}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grow>
    )
}