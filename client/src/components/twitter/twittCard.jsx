import { Grid, Paper } from "@material-ui/core";

export default function TwittCard(props){
    const {text, username, likes, retweet} = props.data;
    return(
        <Grid container item sm={3}>
            <Paper elevation={3}>
                <Grid item sm={12}>
                    {text}
                </Grid>
                <Grid item sm={12}>
                {username}
                </Grid>
                <Grid item sm={12}>
                ❤️ {likes}
                </Grid>
                <Grid item sm={12}>
                🔁 {retweet}
                </Grid>
                <Grid item sm={12}>
                <a className='btn btn-primary px-2' href='https://twitter.com/${TweetData.username}/status/${TweetData.id}'>
                See on twitter! </a>
                </Grid>
            </Paper>

        </Grid>
    )
}