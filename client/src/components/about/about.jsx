import React from 'react'
import { Typography, Grid } from '@material-ui/core';
// import './about.css';
import AboutCard from './aboutCard'

export default function About() {

    let team = [{ name: 'Rodrigo Juarez', img: 'https://avatars.githubusercontent.com/u/64714468?v=4' }, { name: 'Martín Bobrik', img: 'https://avatars.githubusercontent.com/u/13581554?v=4' }, { name: 'Javier Castro', img: 'https://avatars.githubusercontent.com/u/69270095?v=4' },
    { name: 'Andrés Velásquez', img: 'https://avatars.githubusercontent.com/u/58791994?v=4' }, { name: 'Juan Aguirre', img: 'https://avatars.githubusercontent.com/u/63589306?v=4' }, { name: 'Facundo Betella', img: 'https://avatars.githubusercontent.com/u/76120904?v=4' }, { name: 'Julián Ruiz', img: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg' }, { name: 'Facundo Vaena', img: 'https://avatars.githubusercontent.com/u/79978628?v=4' }]

    return (
        <Grid container style={{ display: 'flex', flexDirection: 'column', width: '90%', marginLeft: '86px' }} sm='12'>
            <Grid item style={{ textAlign: 'center', justifyContent: 'center', marginRight: '90px' }}>
                <Typography variant='h3'>Meet The Team</Typography>
            </Grid>
            <Grid container style={{ display: 'flex', marginTop: '-80px' }} sm={12}>
                {team.map(element => {

                    return (<Grid item sm={1} style={{ margin: '6%', marginBottom: '16%' }}>
                        <AboutCard name={element.name} img={element.img} />
                    </Grid>)
                })}
            </Grid>
        </Grid>
    )
}
