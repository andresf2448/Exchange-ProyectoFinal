import { Paper, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import useStyles from 'styles';


export default function Offer({ asks, bids }) {


const classes = useStyles(); 

  return (
    <Container width="100px">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' >Asks</Typography>
          <TableContainer className={classes.tableScroll} component={Paper} >
            <Table stickyHeader size="small" >
              <TableHead >
                <TableRow>
                  <TableCell align="right" >TYPE</TableCell>
                  <TableCell align="right" >PRICE</TableCell>
                  <TableCell align="right" >AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asks.map((ask, i) => (
                  <TableRow  key={i}>
                    <TableCell >Ask</TableCell>
                    <TableCell>{ask.price}</TableCell>
                    <TableCell>{ask.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Bids</Typography>
          <TableContainer className={classes.tableScroll} component={Paper}>
            <Table stickyHeader size="small" >
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

