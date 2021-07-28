import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import io from "socket.io-client";
import TwittCard from "components/twitter/twittCard";
import { useState } from "react";
const SERVER = "//localhost:3005";

var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const useStyles = makeStyles({
  scroll: {
    height: 400,
    width: '40%',
    overflow: "auto",
    marginTop: 2,
    marginLeft: 2
  },
});

export default function Twitter() {
  let [arr, setArr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSocket = () => {
    const socketClient = io(SERVER, connectionOptions);
    socketClient.on("tweet", (tweet) => {
      let TweetData = {
        id: tweet?.data?.id,
        text: tweet.data.text.slice(0, 130),
        username: `@${tweet.includes.users[0].username}`,
        likes: tweet.data.public_metrics.like_count,
        retweet: tweet.data.public_metrics.retweet_count,
      };

      if (arr === []) {
        setArr(TweetData);
      } else {
        setArr((prevState) => {
          return [TweetData, ...prevState];
        });
      }
    });
  };

  return (
    <Grid container spacing={12} className={classes.scroll}>
      {arr &&
        arr.map((twitt) => {
          return <TwittCard data={twitt} />;  
        })
      }
    </Grid>
  );
};
