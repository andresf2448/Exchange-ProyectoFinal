import { Paper, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import useStyles from 'styles';


export default function Offer({ asks, bids }) {


const classes = useStyles(); 

  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <TableContainer className={classes.tableScroll} style={{width:'21vw', minHeight:'40vh', maxHeight: '40vh'}} component={Paper} >
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
                    <TableCell align='center' style={{color:'green'}}>{ask.price}</TableCell>
                    <TableCell align='center' style={{color:'green'}}>{ask.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer className={classes.tableScroll} style={{width:'21vw', minHeight:'30vh', maxHeight: '30vh'}} component={Paper}>
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
                    <TableCell align='center' style={{color:'#9b0000'}}>{bid.price}</TableCell>
                    <TableCell align='center' style={{color:'#9b0000'}}>{bid.amount}</TableCell>
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

