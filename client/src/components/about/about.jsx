import React from "react";
import { useMediaQuery, Typography, Grid } from "@material-ui/core";
// import './about.css';
import AboutCard from "./aboutCard";

export default function About() {
  const ourMediaQuery = useMediaQuery("(min-width:820px)");

  let team = [
    {
      name: "Rodrigo Juarez",
      contact: "https://www.linkedin.com/in/rodrigojuarez-dev/",
      img: "https://avatars.githubusercontent.com/u/64714468?v=4",
    },
    {
      name: "Martín Bobrik",
      contact: "https://www.linkedin.com/in/martinbobrikfullstack/",
      img: "https://avatars.githubusercontent.com/u/13581554?v=4",
    },
    {
      name: "Javier Castro",
      contact: "https://www.linkedin.com/in/javicastro89/",
      img: "https://avatars.githubusercontent.com/u/69270095?v=4",
    },
    {
      name: "Andrés Velásquez",
      contact: "https://www.linkedin.com/in/andresvelasqueztrujillo/",
      img: "https://avatars.githubusercontent.com/u/58791994?v=4",
    },
    {
      name: "Juan Aguirre",
      contact: "https://www.linkedin.com/in/juanseaguirre/",
      img: "https://avatars.githubusercontent.com/u/63589306?v=4",
    },
    {
      name: "Facundo Betella",
      contact: "https://www.linkedin.com/in/facundo-bettella-iunnissi-dev/",
      img: "https://avatars.githubusercontent.com/u/76120904?v=4",
    },
    {
      name: "Julián Ruiz",
      contact: "https://www.linkedin.com/in/julian-ruiz-v/",
      img: "https://avatars.githubusercontent.com/u/76981775?v=4",
    },
    {
      name: "Facundo Vaena",
      contact: "https://www.linkedin.com/in/facundo-vaena/",
      img: "https://avatars.githubusercontent.com/u/79978628?v=4",
    },
  ];

  return (
    <Grid
      container
      
      style={ourMediaQuery ? {

        display: "flex",
        flexDirection: "column",
        width: "90%",
        marginLeft: "86px",
        backgroundColor: "#1f1f1f",
      }
        :
        {
          display: "flex",
          flexDirection: "column",
          // width: "90%",
          marginTop: '12%',
          marginRight: '0%',
          // marginLeft: "6px",

          backgroundColor: "#1f1f1f",
        }}
    >
      <Grid
        item
        style={
          ourMediaQuery ?

            {
              textAlign: "center",
              justifyContent: "center",
              marginRight: "90px",
            }
            :
            {
              textAlign: "center",
              marginRight:'20%'
            }
        }
      >
        <Typography variant="h5" style={ourMediaQuery ? {color:'#FFD523'} : { marginBottom: '35%', color:'#FFD523', marginLeft: '28%' }}>Meet The Team</Typography>
      </Grid>
      <Grid container style={{ display: "flex", marginTop: "-80px" }}>
        {team.map((element, index) => {
          return (
            <Grid
              key={index}
              item
              sm={1}
              style={ourMediaQuery ?{ margin: "6%", marginBottom: "16%" } : {  marginBottom: "90%", marginLeft:'7%' }}
            >
              <AboutCard
                name={element.name}
                img={element.img}
                contact={element.contact}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

// team con links de github     let team = [{ name: 'Rodrigo Juarez', contact: 'https://github.com/rodri-juarez', img: 'https://avatars.githubusercontent.com/u/64714468?v=4' }, { name: 'Martín Bobrik', contact: 'https://github.com/martinbobrik', img: 'https://avatars.githubusercontent.com/u/13581554?v=4' }, { name: 'Javier Castro', contact: 'https://github.com/javicastro89', img: 'https://avatars.githubusercontent.com/u/69270095?v=4' },
//    { name: 'Andrés Velásquez', contact: 'https://github.com/andresf2448',img: 'https://avatars.githubusercontent.com/u/58791994?v=4' }, { name: 'Juan Aguirre', contact: 'https://github.com/aguirrejuanse', img: 'https://avatars.githubusercontent.com/u/63589306?v=4' }, { name: 'Facundo Betella', contact: 'https://github.com/FacundoBettella', img: 'https://avatars.githubusercontent.com/u/76120904?v=4' }, { name: 'Julián Ruiz', contact: 'https://github.com/MJULIAN90', img: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg' }, { name: 'Facundo Vaena', contact: 'https://github.com/Facundo-Vaena', img: 'https://avatars.githubusercontent.com/u/79978628?v=4' }]
