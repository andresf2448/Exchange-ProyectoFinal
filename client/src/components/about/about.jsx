import { Container, Typography, Button, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import useStyles from 'styles';
import { NavLink } from 'react-router-dom';


export const About = () => {

    const classes = useStyles();
    let team = ['Rodrigo Juarez', 'Martín Bobrik', 'Javier Castro', 'Andrés Velazquez','Facundo Betella', 'Julián Ruiz','Juan Aguirre', 'Facundo Vaena']

    return (
        <Grid container style={{ display: 'flex', flexDirection: 'column', width:'90%', marginLeft:'86px' }}>
            <Grid item style={{ marginRight: '80px', marginBottom: '20px' }}>
                <Typography variant='h3'>Meet The Team</Typography>
            </Grid>
            <Grid item style={{display:'flex' ,flexWrap:'wrap', gap:'10px'}}>
                {team.map(element => {

                    return <Card style={{ width: '200px', padding: '20px' }}>
                        <CardContent>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                                title="Contemplative Reptile"
                            />
                            <Typography variant='h6'>
                                {element}
                            </Typography>

                        </CardContent>

                    </Card>
                })}
            </Grid>
        </Grid>
    )
}

{/* <Grid item style={{ gap: '20px', marginLeft: '60px', display: 'flex', flexWrap: 'wrap' }} >
                <Card style={{ width: '200px', padding: '20px' }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                            title="Contemplative Reptile"
                        />
                        <Typography variant='h6'>
                            Rodrigo Juarez
                        </Typography>

                    </CardContent>
                    {/* <CardActions>
                    <Button><NavLink to='/faq' style={{ textDecoration: 'none' }}>Learn more</NavLink></Button>
                </CardActions> */}
                // </Card >
    // <Card style={{ width: '200px', padding: '20px' }}>
    //     <CardContent>
    //         <CardMedia
    //             component="img"
    //             alt="Contemplative Reptile"
    //             height="140"
    //             image="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
    //             title="Contemplative Reptile"
    //         />
    //         <Typography variant='h6'>
    //             Rodrigo Juarez
    //         </Typography>

    //     </CardContent>
    //     {/* <CardActions>
    //                 <Button><NavLink to='/faq' style={{ textDecoration: 'none' }}>Learn more</NavLink></Button>
    //             </CardActions> */}
    // </Card> * /}