import { Button, Grid, Card, Typography } from "@material-ui/core";
import useStyles from 'styles';
import Grow from '@material-ui/core/Grow';

export default function TwittCard(props) {
    const { text, username, likes, retweet, id } = props.data;
    const classes = useStyles();

    return(
        <Grow container in='true' timeout='auto'>
            <Grid container xs={12} className={classes.twitterGrid}>
                <Card item xs={12} className={classes.twitterCard}>
                    <Typography item xs={12} variant='body2' align='center'>
                            {text}...
                    </Typography>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                        <Button xs={6} className={classes.twitterLink} target='_blank' href={`https://twitter.com/${username}/status/${id}`}>
                            now
                        </Button>
                        <Grid xs={6} className={classes.twitterMetrics}>
                            <Typography item xs={6} variant='body2' className={classes.twitterUser}>
                                {username}
                            </Typography >
                            <Grid item xs={6}>
                                ❤️{likes}  🔁{retweet}
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grow>
    )
}