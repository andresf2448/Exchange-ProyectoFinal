import {
  Paper,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  
} from "@material-ui/core";
import useStyles from "styles";

export default function Offer({ asks, bids }) {
  const classes = useStyles();

  return (
    <Container>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <TableContainer
              className={classes.tableScroll}
              style={{ width: "21vw", minHeight: "39vh", maxHeight: "39vh" }}
              component={Paper}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">PRICE</TableCell>
                    <TableCell align="center">AMOUNT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asks?.map((ask, i) => (
                    <TableRow key={i} hover={{backgroundColor:'black'}}>
                      <TableCell align="center" style={{ color: "#008000ab", fontWeight:'bold'  }}>
                        {ask.price}
                      </TableCell>
                      <TableCell align="center" style={{ color: "#008000ab", fontWeight:'bold'  }}>
                        {ask.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              className={classes.tableScroll}
              style={{ width: "21vw", minHeight: "39vh", maxHeight: "39vh" }}
              component={Paper}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow > 
                    <TableCell align="center">PRICE</TableCell>
                    <TableCell align="center">AMOUNT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bids?.map((bid, i) => (
                    <TableRow key={i} hover={{backgroundColor:'black'}}>
                      <TableCell align="center" style={{ color: "rgba(155, 0, 0, 0.48)", fontWeight:'bold' }}>
                        {bid.price}
                      </TableCell>
                      <TableCell align="center" style={{ color: "rgba(155, 0, 0, 0.48)", fontWeight:'bold' }}>
                        {bid.amount}
                      </TableCell>
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
