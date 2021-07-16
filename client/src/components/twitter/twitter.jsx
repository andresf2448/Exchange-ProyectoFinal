import { Box, Grid } from '@material-ui/core';
// import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [arr, setArr]=useState([])
    useEffect(() =>{  
        handleSocket();
    },[]);
    useEffect(()=>{
        console.log('soy array', arr)
    },[arr])

    const handleSocket = () => { 
        const tweetStream = document.getElementById('tweetStream');
        const socketClient = io(SERVER, connectionOptions );
        socketClient.on('tweet', (tweet) => {
            console.log('soy tweet', tweet)
            let TweetData = {
                id: tweet.data.id,
                text: tweet.data.text,
                username: `@${tweet.includes.users[0].username}`,
                likes: tweet.data.public_metrics.like_count,
                retweet: tweet.data.public_metrics.retweet_count,
            }
            setArr((prevState)=>{return [...prevState, TweetData]});

            setTimeout(() => {
                setArr((prevState)=>{
                    return [prevState.slice(Math.max(prevState[3], 0))]})
            }, 15000);
        })
    }

    return(
              <Grid container>
                  {arr.map((twitt)=>{
                      return <TwittCard data={twitt}/>
                  })}
              </Grid>
    )
}

