import React from 'react'
import { Typography, Grid } from '@material-ui/core';
// import './about.css';
import AboutCard from './aboutCard'

export default function About() {

    let team = [{ name: 'Rodrigo Juarez', contact: 'https://www.linkedin.com/in/rodrigojuarez-dev/', img: 'https://avatars.githubusercontent.com/u/64714468?v=4' }, { name: 'Martín Bobrik', contact: 'https://www.linkedin.com/in/martinbobrikfullstack/', img: 'https://avatars.githubusercontent.com/u/13581554?v=4' }, { name: 'Javier Castro', contact: 'https://www.linkedin.com/in/javicastro89/', img: 'https://avatars.githubusercontent.com/u/69270095?v=4' },
    { name: 'Andrés Velásquez', contact: 'https://www.linkedin.com/in/andresvelasqueztrujillo/',img: 'https://avatars.githubusercontent.com/u/58791994?v=4' }, { name: 'Juan Aguirre', contact: 'https://www.linkedin.com/in/juanseaguirre/', img: 'https://avatars.githubusercontent.com/u/63589306?v=4' }, { name: 'Facundo Betella', contact: 'https://www.linkedin.com/in/facundo-bettella-iunnissi-dev/', img: 'https://avatars.githubusercontent.com/u/76120904?v=4' }, { name: 'Julián Ruiz', contact: 'https://www.linkedin.com/in/julian-ruiz-v/', img: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg' }, { name: 'Facundo Vaena', contact: 'https://www.linkedin.com/in/facundo-vaena/', img: 'https://avatars.githubusercontent.com/u/79978628?v=4' }]

    return (
        <Grid container style={{ display: 'flex', flexDirection: 'column', width: '90%', marginLeft: '86px' }} sm='12'>
            <Grid item style={{ textAlign: 'center', justifyContent: 'center', marginRight: '90px' }}>
                <Typography variant='h3'>Meet The Team</Typography>
            </Grid>
            <Grid container style={{ display: 'flex', marginTop: '-80px' }} sm={12}>
                {team.map(element => {

                    return (<Grid item sm={1} style={{ margin: '6%', marginBottom: '16%' }}>
                        <AboutCard name={element.name} img={element.img} contact={element.contact} />
                    </Grid>)
                })}
            </Grid>
        </Grid>
    )
}



// team con links de github     let team = [{ name: 'Rodrigo Juarez', contact: 'https://github.com/rodri-juarez', img: 'https://avatars.githubusercontent.com/u/64714468?v=4' }, { name: 'Martín Bobrik', contact: 'https://github.com/martinbobrik', img: 'https://avatars.githubusercontent.com/u/13581554?v=4' }, { name: 'Javier Castro', contact: 'https://github.com/javicastro89', img: 'https://avatars.githubusercontent.com/u/69270095?v=4' },
//    { name: 'Andrés Velásquez', contact: 'https://github.com/andresf2448',img: 'https://avatars.githubusercontent.com/u/58791994?v=4' }, { name: 'Juan Aguirre', contact: 'https://github.com/aguirrejuanse', img: 'https://avatars.githubusercontent.com/u/63589306?v=4' }, { name: 'Facundo Betella', contact: 'https://github.com/FacundoBettella', img: 'https://avatars.githubusercontent.com/u/76120904?v=4' }, { name: 'Julián Ruiz', contact: 'https://github.com/MJULIAN90', img: 'https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg' }, { name: 'Facundo Vaena', contact: 'https://github.com/Facundo-Vaena', img: 'https://avatars.githubusercontent.com/u/79978628?v=4' }]

