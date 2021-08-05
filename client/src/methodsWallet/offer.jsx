import {
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import useStyles from "styles";

export default function Offer({ asks, bids }) {
  const classes = useStyles();

  return (
        <Grid container>
          <Grid item xs={12}  style={{marginBottom:'5%'}}>
            <TableContainer
              className={classes.tableScroll}
              style={{ minHeight: "38vh", maxHeight: "38vh" }}
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
                      <TableCell align="center" style={{ color: "rgb(17, 95, 0)", fontWeight:'bold', backgroundColor:'rgb(106, 106, 106)'  }}>
                        {ask.price}
                      </TableCell>
                      <TableCell align="center" style={{ color: "rgb(17, 95, 0)", fontWeight:'bold', backgroundColor:'rgb(106, 106, 106)'  }}>
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
              style={{ minHeight: "38vh", maxHeight: "38vh" }}
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
                      <TableCell align="center" style={{ color: "rgb(155, 0, 0)", fontWeight:'bold', backgroundColor:'rgb(106, 106, 106)' }}>
                        {bid.price}
                      </TableCell>
                      <TableCell align="center" style={{ color: "rgb(155, 0, 0)", fontWeight:'bold', backgroundColor:'rgb(106, 106, 106)' }}>
                        {bid.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
  );
}
