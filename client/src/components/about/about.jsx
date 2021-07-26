import React, { useState } from 'react'
import { Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
// import './about.css';
import AboutCard from './aboutCard'

export default function About() {

//https://www.linkedin.com/in/nabilelsawi/detail/photo/
    let team = [{name:'Rodrigo Juarez', img: 'https://avatars.githubusercontent.com/u/64714468?v=4'}, {name:'Martín Bobrik', img: 'https://avatars.githubusercontent.com/u/13581554?v=4'}, {name:'Javier Castro', img: 'https://avatars.githubusercontent.com/u/69270095?v=4'},
        {name: 'Andrés Velásquez', img: 'https://avatars.githubusercontent.com/u/58791994?v=4'},{name:'Juan Aguirre', img: 'https://avatars.githubusercontent.com/u/63589306?v=4'} ,{name:'Facundo Betella', img: 'https://avatars.githubusercontent.com/u/76120904?v=4'}, {name:'Julián Ruiz', img: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg'},
        , {name:'Facundo Vaena', img: 'https://avatars.githubusercontent.com/u/79978628?v=4'}]

    const ejemplo = () => alert('hola')
    return (
        <Grid container  style={{display:'flex', flexDirection:'column', width:'90%', marginLeft:'86px'}}>
            <Grid item style={{textAlign:'center', marginRight:'200px', marginBottom:'20px'}}>
                <Typography variant='h3'>Meet The Team</Typography>
            </Grid>
            <Grid item style={{display:'flex'}} >
                {team.map(element => {

                    return (<div> 
                    <AboutCard name={element.name} img={element.img}/>
                    </div>)
                })}
            </Grid>
        </Grid>
    )
}
