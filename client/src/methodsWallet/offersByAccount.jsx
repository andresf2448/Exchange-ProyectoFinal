import { Typography, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import useStyles from 'styles';

export default function OffersByAccount({ offers }) {
  const classes= useStyles();

  return (
    <Card  style={{
        textAlign: "center",
        marginLeft: "2vw",
        marginRight: "2vw",
        height: "45vh",
      }}>
      <Typography>Active Sale Offers List</Typography>
      <TableContainer className={classes.tableScroll}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers?.records?.length > 1 &&
              offers.records.map((offer) => (
                <TableRow key={offer.id} hover={{backgroundColor:'black'}}>
                  <TableCell>{offer.amount}</TableCell>
                  <TableCell>{offer.buying?.asset_code}</TableCell>
                  <TableCell>{offer.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}