import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@material-ui/core";
import "./about.css";
export default function AboutCard({ name, img, contact }) {
  const [isRotated, setIsRotated] = useState(false);

  const onRotate = () => {
    setIsRotated((rotated) => !rotated);
  };

  return (
    <Grid container className={`card ${isRotated ? "rotated" : " "}`}>
      <Card
        className="front"
        style={{ width: "200px", height: "260px" }}
        sm={2}
      >
        <CardContent>
          <CardMedia
            style={{
              width: "200px",
              marginLeft: "-15px",
              marginBottom: "20px",
              marginTop: "-16px",
            }}
            component="img"
            alt="Image"
            height="140"
            image={img}
            title="Team Member"
          />
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {name}
          </Typography>
          <Button
            className="aboutButton"
            style={{ marginLeft: "52px" }}
            onClick={onRotate}
          >
            More
          </Button>
        </CardContent>
      </Card>
      {/*-------- */}
      <Card className="back" style={{ width: "200px", height: "260px" }}>
        <CardContent>
          <a href={contact}>
            <CardMedia
              className="githubLink"
              style={{ borderRadius: "15px" }}
              component="img"
              alt="Image"
              height="140"
              // image="https://image.flaticon.com/icons/png/512/733/733553.png" GITHUB
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSLqqo7eIN4iIQbGU3C1fYISY3fE0aDkmAaA&usqp=CAU"
              title="Team Member"
            />
          </a>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {name}
          </Typography>

          <Button
            className="aboutButton"
            style={{ marginLeft: "52px" }}
            onClick={onRotate}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

// img member https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg
