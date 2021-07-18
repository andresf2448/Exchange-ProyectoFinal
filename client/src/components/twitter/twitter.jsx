import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './twitter.css'
import TwittCard from 'components/twitter/twittCard'
import { useState } from 'react';
const SERVER = '//localhost:3005';

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

export const Twitter = () => {
    let [arr, setArr] = useState([]);

    useEffect(() =>{  
        handleSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=> {
        if(arr.length >= 5) {
            setTimeout(() => { 
                setArr([])
            }, 8000)
        }
    },[arr])

    const handleSocket = () => { 
        const socketClient = io(SERVER, connectionOptions );
        socketClient.on('tweet', (tweet) => {
            let TweetData = {
                id: tweet.data.id,
                text: tweet.data.text.slice(0, 130),
                username: `@${tweet.includes.users[0].username}`,
                likes: tweet.data.public_metrics.like_count,
                retweet: tweet.data.public_metrics.retweet_count,
            }

            if(arr === []) {
                setArr(TweetData);
            }
            else {
                setArr((prevState)=>{ 
                    return [
                        ...prevState, TweetData
                ]});
            }     
        })
    }

    return(
            <Grid container spacing={3}>
                {arr.length <= 4 && arr.map((twitt)=> {
                    return <TwittCard data={twitt}/>}
                )}                   
            </Grid>

    )
}

