import React, { useState } from 'react'
import { Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import './about.css'
export default function AboutCard({ name, img }) {

    const [isRotated, setIsRotated] = useState(false);

    const onRotate = () => { setIsRotated((rotated) => !rotated) };


    return (
        <Grid container className={`card ${isRotated ? 'rotated' : ' '}`} onClick={onRotate} sm={12}>
            <Card className='front' style={{ width: '200px', height:'260px',  }} sm={2}>
                <CardContent >
                    <CardMedia
                        style={{ borderRadius: '20px' }}
                        component="img"
                        alt="Image"
                        height="140"
                        image="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                        title="Team Member"
                    />
                    <Typography variant='h6' style={{textAlign:'center'}}>
                        {name}
                    </Typography>

                </CardContent>

            </Card>
            {/*-------- */}
            <Card className='back' style={{ width: '200px', height:'260px' }}>
                <CardContent>
                    <CardMedia
                        
                        style={{borderRadius:'20px'}}
                        component="img"
                        alt="Image"
                        height="140"
                        image={img}
                        title="Team Member"
                    />
                    <Typography variant='h6' style={{textAlign:'center'}}>
                        {name}
                    </Typography>

                </CardContent>

            </Card>
        </Grid>
    )
}
