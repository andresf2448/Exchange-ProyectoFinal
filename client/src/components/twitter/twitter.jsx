import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './twitter.css'
const SERVER = '//localhost:3005';

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

export const Twitter = () => {
    
    useEffect(() =>{  
        handleSocket();
    },[]);

    const handleSocket = () => { 
        const tweetStream = document.getElementById('tweetStream');
        const socketClient = io(SERVER, connectionOptions );
        socketClient.on('tweet', (tweet) => {
            // console.log(tweet)
            const TweetData = {
                id: tweet.data.id,
                text: tweet.data.text,
                username: `@${tweet.includes.users[0].username}`,
                likes: tweet.data.public_metrics.like_count,
                retweet: tweet.data.public_metrics.retweet_count,
            }

            const tweetEl = document.createElement('div');
            tweetEl.className = 'card my-4 mx-4';
            tweetEl.innerHTML = 
            `
                <div className='card-body'>
                    
                    <h4 className='card-title'>${TweetData.text}</h4>
                    <h5 className='card-subtitle mb-2 text-muted'>${TweetData.username}</h5>

                    <div class="d-flex justify-content-center">
                        <h6 className='card-subtitle mb-2 text-muted'> ❤️ ${TweetData.likes}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'> 🔁 ${TweetData.retweet}</h5>
                    </div>

                    
                    <a className='btn btn-primary px-2' href='https://twitter.com/${TweetData.username}/status/${TweetData.id}'>
                    <i class='fab fa-twitter'></i> See on twitter! </a>
                </div>
            `;
            tweetStream.appendChild(tweetEl);

            setTimeout(() => {
                tweetEl.remove();
            }, 30000);
        })
    }

    return(
        <div>
            <nav className="navbar navbar-dark bg-dark my-4 mx-4 ">
                <div className="container justify-content-center">
                    <a href="#tweetStream" className="navbar-brand p-3">Real-Time Tweet Stream</a>
                </div>    
            </nav>
              <div id='tweetStream' className="tweetsContainer"></div>           
        </div>
    )
}

