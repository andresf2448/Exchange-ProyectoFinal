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

    let [arr, setArr] = useState([])

    useEffect(() =>{  
        handleSocket();
    },[]);

    useEffect(()=> {
        if(arr.length > 3) {
            setTimeout(() =>{
                setArr([])
            }, 8000)
        }
    },[arr])

    const handleSocket = () => { 
        const socketClient = io(SERVER, connectionOptions );
        socketClient.on('tweet', (tweet) => {
            // console.log('soy tweet', tweet)
            let TweetData = {
                id: tweet.data.id,
                text: tweet.data.text,
                username: `@${tweet.includes.users[0].username}`,
                likes: tweet.data.public_metrics.like_count,
                retweet: tweet.data.public_metrics.retweet_count,
            }
            if(arr === []) {
                setArr(TweetData);
            }
            else if(arr.length < 5) {
                setArr((prevState)=>{ 
                    return [
                    ...prevState, TweetData
                ]});
            }     
        })
    }

    return(
              <Grid container spacing={3}>
                  {arr ?
                  arr.map((twitt)=>{
                      return <TwittCard data={twitt}/>
                  }):
                  ""
                }
              </Grid>
    )
}

