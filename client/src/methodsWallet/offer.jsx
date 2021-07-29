import { Paper, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import useStyles from 'styles';


export default function Offer({ asks, bids }) {


const classes = useStyles(); 

  return (
    <Container width="100px">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' style={{marginLeft:'90px'}}>Buying</Typography>
          <TableContainer className={classes.tableScroll} style={{width:'290px'}} component={Paper} >
            <Table stickyHeader size="small" >
              <TableHead >
                <TableRow>
                  <TableCell  align='center'>PRICE</TableCell>
                  <TableCell  align='center'>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asks?.map((ask, i) => (
                  <TableRow  key={i}>
                    <TableCell align='center'>{ask.price}</TableCell>
                    <TableCell align='center'>{ask.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' style={{marginLeft:'95px'}}>Selling</Typography>
          <TableContainer className={classes.tableScroll} style={{width:'290px'}} component={Paper}>
            <Table stickyHeader size="small" >
              <TableHead >
                <TableRow>
                  <TableCell align='center'>PRICE</TableCell>
                  <TableCell align='center'>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids?.map((bid, i) => (
                  <TableRow key={i}>
                    <TableCell align='center'>{bid.price}</TableCell>
                    <TableCell align='center'>{bid.amount}</TableCell>
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

