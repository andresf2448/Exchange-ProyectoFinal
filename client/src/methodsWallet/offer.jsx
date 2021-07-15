import { Paper, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export default function Offer({ asks, bids }) {

  return (
    <Container width="100px">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item >
          <Typography variant='h4' >Asks</Typography>
          <TableContainer component={Paper}>
            <Table size="small" >
              <TableHead >
                <TableRow>
                  <TableCell align="right" >TYPE</TableCell>
                  <TableCell align="right" >PRICE</TableCell>
                  <TableCell align="right" >AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asks.map((ask, i) => (
                  <TableRow key={i}>
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
          <TableContainer component={Paper}>
            <Table size="small" >
              <TableHead >
                <TableRow>
                  <TableCell>TYPE</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map((bid, i) => (
                  <TableRow key={i}>
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

