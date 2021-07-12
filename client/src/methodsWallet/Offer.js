import { Container, Typography, Grid, Card, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import useStyles from 'styles.js';

export default function Offer({ asks, bids }) {
  
  const classes = useStyles();

  return (
    <Container width="100px">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item >
          <Typography variant='h4' >Asks</Typography>
          <TableContainer component="Paper">
            <Table size="small" >
              <TableHead color="#f44336" >
                <TableRow>
                  <TableCell align="right" >TYPE</TableCell>
                  <TableCell align="right" >PRICE</TableCell>
                  <TableCell align="right" >AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asks.map((ask) => (
                  <TableRow>
                    <TableCell>Ask</TableCell>
                    <TableCell>{ask.price}</TableCell>
                    <TableCell>{ask.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <Typography variant='h4'>Bids</Typography>
          <TableContainer component="Paper">
            <Table size="small" >
              <TableHead color="#f44336" >
                <TableRow>
                  <TableCell>TYPE</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map((bid) => (
                  <TableRow>
                    <TableCell>Bid</TableCell>
                    <TableCell>{bid.price}</TableCell>
                    <TableCell>{bid.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

